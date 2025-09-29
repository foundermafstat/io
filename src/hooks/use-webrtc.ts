"use client";

import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Conversation } from "@/lib/conversations";
import { useTranslations } from "@/components/translations-context";
import { useBroadcast } from "@/components/broadcast-context";

export interface Tool {
  name: string;
  description: string;
  parameters?: Record<string, any>;
}

/**
 * The return type for the hook, matching Approach A
 * (RefObject<HTMLDivElement | null> for the audioIndicatorRef).
 */
interface UseWebRTCAudioSessionReturn {
  status: string;
  isSessionActive: boolean;
  audioIndicatorRef: React.RefObject<HTMLDivElement | null>;
  startSession: () => Promise<void>;
  stopSession: () => void;
  handleStartStopClick: () => void;
  registerFunction: (name: string, fn: Function) => void;
  msgs: any[];
  currentVolume: number;
  conversation: Conversation[];
  sendTextMessage: (text: string) => void;
}

/**
 * Hook to manage a real-time session with OpenAI's Realtime endpoints.
 */
export default function useWebRTCAudioSession(
  voice: string,
  tools?: Tool[],
  replicaUuid?: string,
  replicaInstructions?: string,
): UseWebRTCAudioSessionReturn {
  const { t, locale } = useTranslations();
  const { addPendingQuestion, markQuestionAnswered, resetBroadcastState } = useBroadcast();

  // Connection/session states
  const [status, setStatus] = useState("");
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Property data for AI context
  const [propertyContext, setPropertyContext] = useState<any>(null);

  // Audio references for local mic
  // Approach A: explicitly typed as HTMLDivElement | null
  const audioIndicatorRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // WebRTC references
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  // Keep track of all raw events/messages
  const [msgs, setMsgs] = useState<any[]>([]);

  // Main conversation state
  const [conversation, setConversation] = useState<Conversation[]>([]);

  // Функция для определения, является ли текст вопросом
  const isQuestion = (text: string): boolean => {
    const questionWords = ['?', 'что', 'где', 'когда', 'почему', 'как', 'какой', 'какая', 'какое', 'какие', 'кто', 'сколько', 'можно', 'нужно', 'следует', 'хотите', 'можете', 'знаете'];
    const lowerText = text.toLowerCase();
    return questionWords.some(word => lowerText.includes(word)) || text.includes('?');
  };

  // For function calls (AI "tools")
  const functionRegistry = useRef<Record<string, Function>>({});

  // Ref для broadcast функций для использования в обработчиках
  const broadcastRef = useRef({
    addPendingQuestion,
    markQuestionAnswered
  });

  // Volume analysis (assistant inbound audio)
  const [currentVolume, setCurrentVolume] = useState(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const volumeIntervalRef = useRef<number | null>(null);

  /**
   * We track only the ephemeral user message **ID** here.
   * While user is speaking, we update that conversation item by ID.
   */
  const ephemeralUserMessageIdRef = useRef<string | null>(null);

  /**
   * Register a function (tool) so the AI can call it.
   */
  function registerFunction(name: string, fn: Function) {
    functionRegistry.current[name] = fn;
  }

  /**
   * Configure the data channel on open, sending a session update to the server.
   */
  function configureDataChannel(dataChannel: RTCDataChannel) {
    // Send session update
    const sessionUpdate = {
      type: "session.update",
      session: {
        modalities: ["text", "audio"],
        tools: tools || [],
        input_audio_transcription: {
          model: "whisper-1",
        },
      },
    };
    dataChannel.send(JSON.stringify(sessionUpdate));

    console.log("Session update sent:", sessionUpdate);
    console.log("Setting locale: " + t("language") + " : " + locale);

    // Send language preference message
    const languageMessage = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: t("languagePrompt"),
          },
        ],
      },
    };
    dataChannel.send(JSON.stringify(languageMessage));
  }

  /**
   * Return an ephemeral user ID, creating a new ephemeral message in conversation if needed.
   */
  function getOrCreateEphemeralUserId(): string {
    let ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) {
      // Use uuidv4 for a robust unique ID
      ephemeralId = uuidv4();
      ephemeralUserMessageIdRef.current = ephemeralId;

      const newMessage: Conversation = {
        id: ephemeralId,
        role: "user",
        text: "",
        timestamp: new Date().toISOString(),
        isFinal: false,
        status: "speaking",
      };

      // Append the ephemeral item to conversation
      setConversation((prev) => [...prev, newMessage]);
    }
    return ephemeralId;
  }

  /**
   * Update the ephemeral user message (by ephemeralUserMessageIdRef) with partial changes.
   */
  function updateEphemeralUserMessage(partial: Partial<Conversation>) {
    const ephemeralId = ephemeralUserMessageIdRef.current;
    if (!ephemeralId) return; // no ephemeral user message to update

    setConversation((prev) =>
      prev.map((msg) => {
        if (msg.id === ephemeralId) {
          return { ...msg, ...partial };
        }
        return msg;
      }),
    );
  }

  /**
   * Clear ephemeral user message ID so the next user speech starts fresh.
   */
  function clearEphemeralUserMessage() {
    ephemeralUserMessageIdRef.current = null;
  }

  /**
   * Main data channel message handler: interprets events from the server.
   */
  async function handleDataChannelMessage(event: MessageEvent) {
    try {
      const msg = JSON.parse(event.data);
      // console.log("Incoming dataChannel message:", msg);

      switch (msg.type) {
        /**
         * User speech started
         */
        case "input_audio_buffer.speech_started": {
          getOrCreateEphemeralUserId();
          updateEphemeralUserMessage({ status: "speaking" });
          break;
        }

        /**
         * User speech stopped
         */
        case "input_audio_buffer.speech_stopped": {
          // optional: you could set "stopped" or just keep "speaking"
          updateEphemeralUserMessage({ status: "speaking" });
          break;
        }

        /**
         * Audio buffer committed => "Processing speech..."
         */
        case "input_audio_buffer.committed": {
          updateEphemeralUserMessage({
            text: "Processing speech...",
            status: "processing",
          });
          break;
        }

        /**
         * Partial user transcription
         */
        case "conversation.item.input_audio_transcription": {
          const partialText =
            msg.transcript ?? msg.text ?? "User is speaking...";
          updateEphemeralUserMessage({
            text: partialText,
            status: "speaking",
            isFinal: false,
          });
          break;
        }

        /**
         * Final user transcription
         */
        case "conversation.item.input_audio_transcription.completed": {
          // console.log("Final user transcription:", msg.transcript);
          const userResponse = msg.transcript || "";

          updateEphemeralUserMessage({
            text: userResponse,
            isFinal: true,
            status: "final",
          });
          clearEphemeralUserMessage();

          // Отмечаем все ожидающие вопросы как отвеченные
          // В будущем можно добавить более умную логику для сопоставления конкретных вопросов
          setTimeout(() => {
            broadcastRef.current.markQuestionAnswered("current", userResponse);
          }, 0);
          break;
        }

        /**
         * Streaming AI transcripts (assistant partial)
         */
        case "response.audio_transcript.delta": {
          const newMessage: Conversation = {
            id: uuidv4(), // generate a fresh ID for each assistant partial
            role: "assistant",
            text: msg.delta,
            timestamp: new Date().toISOString(),
            isFinal: false,
          };

          setConversation((prev) => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.role === "assistant" && !lastMsg.isFinal) {
              // Append to existing assistant partial
              const updated = [...prev];
              updated[updated.length - 1] = {
                ...lastMsg,
                text: lastMsg.text + msg.delta,
              };
              return updated;
            } else {
              // Start a new assistant partial
              return [...prev, newMessage];
            }
          });
          break;
        }

        /**
         * Mark the last assistant message as final
         */
        case "response.audio_transcript.done": {
          setConversation((prev) => {
            if (prev.length === 0) return prev;
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];
            lastMessage.isFinal = true;

            return updated;
          });

          // Проверяем, является ли сообщение вопросом и добавляем в broadcast context
          // Делаем это асинхронно, чтобы избежать обновления состояния во время рендеринга
          setTimeout(() => {
            const lastMessage = conversation[conversation.length - 1];
            if (lastMessage && lastMessage.text && isQuestion(lastMessage.text)) {
              broadcastRef.current.addPendingQuestion({
                question: lastMessage.text,
              });
            }
          }, 0);

          break;
        }

        /**
         * AI calls a function (tool)
         */
        case "response.function_call_arguments.done": {
          const fn = functionRegistry.current[msg.name];
          if (fn) {
            const args = JSON.parse(msg.arguments);
            const result = await fn(args);

            // Respond with function output
            const response = {
              type: "conversation.item.create",
              item: {
                type: "function_call_output",
                call_id: msg.call_id,
                output: JSON.stringify(result),
              },
            };
            dataChannelRef.current?.send(JSON.stringify(response));

            const responseCreate = {
              type: "response.create",
            };
            dataChannelRef.current?.send(JSON.stringify(responseCreate));
          }
          break;
        }

        default: {
          // console.warn("Unhandled message type:", msg.type);
          break;
        }
      }

      // Always log the raw message
      setMsgs((prevMsgs) => [...prevMsgs, msg]);
      return msg;
    } catch (error) {
      console.error("Error handling data channel message:", error);
    }
  }

  /**
   * Load property data for AI context
   */
  async function loadPropertyContext() {
    try {
      const response = await fetch("/api/properties/ai-context?limit=20&featured=true");
      if (response.ok) {
        const contextData = await response.json();
        setPropertyContext(contextData);
        console.log("Property context loaded:", contextData.totalProperties, "properties");
        return contextData;
      } else {
        console.warn("Failed to load property context:", response.status);
        return null;
      }
    } catch (error) {
      console.error("Error loading property context:", error);
      return null;
    }
  }

  /**
   * Fetch ephemeral token from your Next.js endpoint
   */
  async function getEphemeralToken() {
    try {
      // Load property context first
      const propertyData = await loadPropertyContext();

      // Prepare enhanced instructions with property context
      let instructions = "Start conversation with the user by saying 'Hello, how can I help you today?' Use the available tools when relevant. After executing a tool, you will need to respond (create a subsequent conversation item) to the user sharing the function result or error. If you do not respond with additional message with function result, user will not know you successfully executed the tool. Speak and respond in the language of the user.";

      if (replicaUuid && replicaInstructions) {
        instructions = replicaInstructions;
      }

      // Add property context to instructions if available
      if (propertyData && propertyData.totalProperties > 0) {
        const propertySummary = generatePropertySummary(propertyData);
        instructions = `${instructions}\n\nADDITIONAL CONTEXT: You have access to ${propertyData.totalProperties} properties in your knowledge base. ${propertySummary} Use this information to help users find suitable properties for rent or purchase. When users ask about available properties, reference specific properties from your knowledge base and provide detailed information about them.`;
      }

      const response = await fetch("/api/openai/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voice,
          replicaUuid,
          replicaInstructions: instructions,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to get ephemeral token: ${response.status}`);
      }
      const data = await response.json();
      return data.client_secret.value;
    } catch (err) {
      console.error("getEphemeralToken error:", err);
      throw err;
    }
  }

  /**
   * Generate a summary of available properties for AI context
   */
  function generatePropertySummary(propertyData: any): string {
    const { properties, totalProperties } = propertyData;

    if (totalProperties === 0) return "No properties available.";

    // Group properties by type and operation
    const byType: Record<string, any[]> = {};
    const byOperation: Record<string, number> = { RENT: 0, SALE: 0 };

    properties.forEach((prop: any) => {
      const type = prop.type || 'OTHER';
      if (!byType[type]) byType[type] = [];
      byType[type].push(prop);

      if (prop.operation === 'RENT' && prop.price.rent) byOperation.RENT++;
      if (prop.operation === 'SALE' && prop.price.sale) byOperation.SALE++;
    });

    let summary = `Available properties summary:\n`;
    summary += `- Total: ${totalProperties} properties\n`;
    summary += `- For rent: ${byOperation.RENT} properties\n`;
    summary += `- For sale: ${byOperation.SALE} properties\n\n`;

    // Add property type breakdown
    Object.entries(byType).forEach(([type, props]) => {
      summary += `${type}: ${props.length} properties\n`;
    });

    // Add featured properties mention
    const featuredCount = properties.filter((p: any) => p.isFeatured).length;
    if (featuredCount > 0) {
      summary += `\nFeatured properties: ${featuredCount} premium listings\n`;
    }

    return summary;
  }

  /**
   * Sets up a local audio visualization for mic input (toggle wave CSS).
   */
  function setupAudioVisualization(stream: MediaStream) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;
    source.connect(analyzer);

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateIndicator = () => {
      if (!audioContext) return;
      analyzer.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;

      // Toggle an "active" class if volume is above a threshold
      if (audioIndicatorRef.current) {
        audioIndicatorRef.current.classList.toggle("active", average > 30);
      }
      requestAnimationFrame(updateIndicator);
    };
    updateIndicator();

    audioContextRef.current = audioContext;
  }

  /**
   * Calculate RMS volume from inbound assistant audio
   */
  function getVolume(): number {
    if (!analyserRef.current) return 0;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteTimeDomainData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      const float = (dataArray[i] - 128) / 128;
      sum += float * float;
    }
    return Math.sqrt(sum / dataArray.length);
  }

  /**
   * Start a new session:
   */
  async function startSession() {
    try {
      setStatus("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      setupAudioVisualization(stream);

      setStatus("Fetching ephemeral token...");
      const ephemeralToken = await getEphemeralToken();

      setStatus("Establishing connection...");
      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      // Hidden <audio> element for inbound assistant TTS
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;

      // Inbound track => assistant's TTS
      pc.ontrack = (event) => {
        audioEl.srcObject = event.streams[0];

        // Optional: measure inbound volume
        const audioCtx = new (window.AudioContext || window.AudioContext)();
        const src = audioCtx.createMediaStreamSource(event.streams[0]);
        const inboundAnalyzer = audioCtx.createAnalyser();
        inboundAnalyzer.fftSize = 256;
        src.connect(inboundAnalyzer);
        analyserRef.current = inboundAnalyzer;

        // Start volume monitoring
        volumeIntervalRef.current = window.setInterval(() => {
          setCurrentVolume(getVolume());
        }, 100);
      };

      // Data channel for transcripts
      const dataChannel = pc.createDataChannel("response");
      dataChannelRef.current = dataChannel;

      dataChannel.onopen = () => {
        // console.log("Data channel open");
        configureDataChannel(dataChannel);
      };
      dataChannel.onmessage = handleDataChannelMessage;

      // Add local (mic) track
      pc.addTrack(stream.getTracks()[0]);

      // Create offer & set local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send SDP offer to OpenAI Realtime
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const response = await fetch(`${baseUrl}?model=${model}&voice=${voice}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${ephemeralToken}`,
          "Content-Type": "application/sdp",
        },
      });

      // Set remote description
      const answerSdp = await response.text();
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });

      setIsSessionActive(true);
      setStatus("Session established successfully!");
    } catch (err) {
      console.error("startSession error:", err);
      setStatus(`Error: ${err}`);
      stopSession();
    }
  }

  /**
   * Stop the session & cleanup
   */
  function stopSession() {
    if (dataChannelRef.current) {
      dataChannelRef.current.close();
      dataChannelRef.current = null;
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
      audioStreamRef.current = null;
    }
    if (audioIndicatorRef.current) {
      audioIndicatorRef.current.classList.remove("active");
    }
    if (volumeIntervalRef.current) {
      clearInterval(volumeIntervalRef.current);
      volumeIntervalRef.current = null;
    }
    analyserRef.current = null;

    ephemeralUserMessageIdRef.current = null;

    setCurrentVolume(0);
    setIsSessionActive(false);
    setStatus("Session stopped");
    setMsgs([]);
    setConversation([]);

    // Очищаем состояние трансляции
    resetBroadcastState();
  }

  /**
   * Toggle start/stop from a single button
   */
  function handleStartStopClick() {
    if (isSessionActive) {
      stopSession();
    } else {
      startSession();
    }
  }

  /**
   * Send a text message through the data channel
   */
  function sendTextMessage(text: string) {
    if (!dataChannelRef.current || dataChannelRef.current.readyState !== "open") {
      console.error("Data channel not ready");
      return;
    }

    const messageId = uuidv4();
    
    // Add message to conversation immediately
    const newMessage: Conversation = {
      id: messageId,
      role: "user",
      text,
      timestamp: new Date().toISOString(),
      isFinal: true,
      status: "final",
    };
    
    setConversation(prev => [...prev, newMessage]);

    // Send message through data channel
    const message = {
      type: "conversation.item.create",
      item: {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: text,
          },
        ],
      },
    };

    const response = {
      type: "response.create",
    };
    
    dataChannelRef.current.send(JSON.stringify(message));
    dataChannelRef.current.send(JSON.stringify(response));}

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    status,
    isSessionActive,
    audioIndicatorRef,
    startSession,
    stopSession,
    handleStartStopClick,
    registerFunction,
    msgs,
    currentVolume,
    conversation,
    sendTextMessage,
  };
}
