"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SensayReplica } from "@/lib/replicas-context";
import { useReplicas } from "@/lib/replicas-context";
import { useToast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = "selected_replica_uuid";

interface ReplicaContextType {
  selectedReplicaUuid: string;
  setSelectedReplicaUuid: (uuid: string) => void;
  replicas: SensayReplica[];
  loading: boolean;
  refreshReplicas: () => Promise<void>;
  selectedReplica: SensayReplica | undefined;
}

const ReplicaContext = createContext<ReplicaContextType | undefined>(undefined);

export function ReplicaProvider({ children }: { children: React.ReactNode }) {
  console.log('ReplicaProvider - Component mounted');
  
  const [selectedReplicaUuid, setSelectedReplicaUuid] = useState<string>("");
  
  let replicasState, refetchReplicas;
  try {
    const replicasContext = useReplicas();
    replicasState = replicasContext.state;
    refetchReplicas = replicasContext.refetchReplicas;
    console.log('ReplicaProvider - Successfully connected to ReplicasProvider');
  } catch (error) {
    console.error('ReplicaProvider - Failed to connect to ReplicasProvider:', error);
    // Fallback state
    replicasState = { replicas: [], loading: false, error: 'ReplicasProvider not available', lastFetched: null };
    refetchReplicas = async () => {};
  }
  
  const { toast } = useToast();

  const replicas = replicasState.replicas;
  const loading = replicasState.loading;
  const selectedReplica = replicas.find(replica => replica.uuid === selectedReplicaUuid);

  // Отладочная информация
  console.log('ReplicaProvider - replicasState:', replicasState);
  console.log('ReplicaProvider - replicas count:', replicas.length);
  console.log('ReplicaProvider - loading:', loading);
  console.log('ReplicaProvider - error:', replicasState.error);

  // Load saved replica from localStorage on initialization
  useEffect(() => {
    const savedUuid = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedUuid) {
      setSelectedReplicaUuid(savedUuid);
    }
  }, []);

  // Save selected replica to localStorage when it changes
  useEffect(() => {
    if (selectedReplicaUuid) {
      localStorage.setItem(LOCAL_STORAGE_KEY, selectedReplicaUuid);
    }
  }, [selectedReplicaUuid]);

  // Проверяем, существует ли сохраненная реплика в полученном списке
  useEffect(() => {
    console.log('ReplicaProvider - replicas changed, count:', replicas.length);
    if (replicas.length > 0) {
      const savedUuid = selectedReplicaUuid || localStorage.getItem(LOCAL_STORAGE_KEY);
      const replicaExists = replicas.some(replica => replica.uuid === savedUuid);
      
      console.log('ReplicaProvider - savedUuid:', savedUuid);
      console.log('ReplicaProvider - replicaExists:', replicaExists);
      
      if (replicas.length > 0) {
        if (replicaExists && savedUuid) {
          // Если сохраненная реплика существует, используем ее
          if (savedUuid !== selectedReplicaUuid) {
            console.log('ReplicaProvider - Setting saved replica:', savedUuid);
            setSelectedReplicaUuid(savedUuid);
          }
        } else {
          // Если сохраненная реплика не существует или не выбрана, выбираем первую в списке
          console.log('ReplicaProvider - Saved replica not found, using first available:', replicas[0].uuid);
          setSelectedReplicaUuid(replicas[0].uuid);
        }
      }
    }
  }, [replicas, selectedReplicaUuid]);

  // Обертка для refetchReplicas из глобального контекста
  const refreshReplicas = async () => {
    try {
      await refetchReplicas();
    } catch (error) {
      console.error("Error refreshing replicas:", error);
      toast({
        title: "Error",
        description: "Failed to refresh replicas. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ReplicaContext.Provider
      value={{
        selectedReplicaUuid,
        setSelectedReplicaUuid,
        replicas,
        loading,
        refreshReplicas,
        selectedReplica
      }}
    >
      {children}
    </ReplicaContext.Provider>
  );
}

export function useReplica() {
  const context = useContext(ReplicaContext);
  if (context === undefined) {
    throw new Error("useReplica must be used within a ReplicaProvider");
  }
  return context;
}
