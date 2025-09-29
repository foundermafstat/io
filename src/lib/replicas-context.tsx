'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface SensayReplicaLLM {
  model: string;
  tools: string[];
  memoryMode: string;
  systemMessage: string;
}

export interface SensayReplicaIntegration {
  token: string;
  is_active?: boolean;
  service_name: string;
}

export interface SensayReplica {
  llm: SensayReplicaLLM;
  name: string;
  slug: string;
  tags: string[];
  type: string;
  uuid: string;
  ownerID: string;
  private: boolean;
  purpose: string;
  greeting: string;
  created_at: string;
  owner_uuid: string;
  elevenLabsID?: string;
  introduction?: string;
  profileImage?: string;
  profile_image?: string;
  video_enabled: boolean;
  voice_enabled: boolean;
  system_message: string;
  whitelistEmails?: string[];
  shortDescription?: string;
  short_description?: string;
  chat_history_count: number;
  suggestedQuestions?: string[];
  discord_integration?: SensayReplicaIntegration;
  telegram_integration?: SensayReplicaIntegration;
  // Добавьте другие поля, которые возвращает API Sensay
  [key: string]: any;
}

interface ReplicasState {
  replicas: SensayReplica[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
}

interface ReplicasContextType {
  state: ReplicasState;
  refetchReplicas: () => Promise<void>;
  getReplicaById: (id: string) => SensayReplica | undefined;
}

const ReplicasContext = createContext<ReplicasContextType | undefined>(undefined);

// Константы для кэширования
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут
const CACHE_KEY = 'sensay_replicas_cache';

export function ReplicasProvider({ children }: { children: ReactNode }) {
  console.log('ReplicasProvider - Component mounted');
  
  const [state, setState] = useState<ReplicasState>({
    replicas: [],
    loading: false,
    error: null,
    lastFetched: null,
  });
  
  const [isInitialized, setIsInitialized] = useState(false);

  // Функция для загрузки реплик
  const fetchReplicas = async (forceRefresh = false) => {
    // Временно отключаем кэш для отладки
    console.log('fetchReplicas called with forceRefresh:', forceRefresh);
    
    // Проверяем кэш, если не принудительное обновление
    if (!forceRefresh) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const now = Date.now();
          
          // Если кэш еще актуален, используем его
          if (now - timestamp < CACHE_DURATION) {
            console.log('Using cached replicas:', data.length, 'items');
            setState(prev => ({
              ...prev,
              replicas: data,
              loading: false,
              error: null,
              lastFetched: timestamp,
            }));
            return;
          } else {
            console.log('Cache expired, fetching fresh data');
          }
        } catch (error) {
          console.warn('Failed to parse cached replicas:', error);
        }
      } else {
        console.log('No cache found, fetching fresh data');
      }
    } else {
      console.log('Force refresh requested, fetching fresh data');
    }

    // Если уже загружаем, не делаем повторный запрос
    if (state.loading) {
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      console.log('Fetching replicas from API...');
      const response = await fetch('/api/sensay/replicas');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch replicas: ${response.status}`);
      }

      const data = await response.json();
      // API возвращает массив реплик напрямую, а не объект с полем items
      const replicas = Array.isArray(data) ? data : (data.items || data.replicas || []);
      
      console.log('Replicas fetched successfully:', replicas.length, 'items');
      console.log('Replicas data:', replicas);

      // Сохраняем в кэш
      const cacheData = {
        data: replicas,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setState({
        replicas,
        loading: false,
        error: null,
        lastFetched: Date.now(),
      });
    } catch (error) {
      console.error('Error fetching replicas:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch replicas',
      }));
    }
  };

  // Функция для принудительного обновления
  const refetchReplicas = async () => {
    await fetchReplicas(true);
  };

  // Функция для получения реплики по ID
  const getReplicaById = (id: string): SensayReplica | undefined => {
    return state.replicas.find(replica => replica.uuid === id);
  };

  // Загружаем реплики при монтировании компонента
  useEffect(() => {
    console.log('ReplicasProvider - useEffect triggered, fetching replicas...');
    // Проверяем, что мы на клиентской стороне и еще не инициализированы
    if (typeof window !== 'undefined' && !isInitialized) {
      console.log('ReplicasProvider - Initializing...');
      setIsInitialized(true);
      fetchReplicas();
    } else {
      console.log('ReplicasProvider - Skipping fetch (server side or already initialized)');
    }
  }, [isInitialized]);

  // Очищаем кэш при размонтировании (опционально)
  useEffect(() => {
    return () => {
      // Можно добавить логику очистки кэша при необходимости
    };
  }, []);

  return (
    <ReplicasContext.Provider
      value={{
        state,
        refetchReplicas,
        getReplicaById,
      }}
    >
      {children}
    </ReplicasContext.Provider>
  );
}

export function useReplicas() {
  const context = useContext(ReplicasContext);
  if (context === undefined) {
    throw new Error('useReplicas must be used within a ReplicasProvider');
  }
  return context;
}

// Хук для получения активных реплик
export function useActiveReplicas() {
  const { state } = useReplicas();
  const activeReplicas = state.replicas.filter(replica => 
    !replica.private // Не приватная
  );
  
  console.log('useActiveReplicas - Total replicas:', state.replicas.length);
  console.log('useActiveReplicas - Active replicas:', activeReplicas.length);
  console.log('useActiveReplicas - Replicas data:', state.replicas);
  
  return activeReplicas;
}

// Хук для получения первой активной реплики
export function usePrimaryReplica() {
  const { state } = useReplicas();
  const activeReplicas = state.replicas.filter(replica => 
    !replica.private
  );
  return activeReplicas[0] || state.replicas[0];
}
