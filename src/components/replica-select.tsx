"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCcw } from "lucide-react"
import { useReplicas, useActiveReplicas, type SensayReplica } from "@/lib/replicas-context"
import { useToast } from "@/hooks/use-toast"

interface ReplicaSelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function ReplicaSelect({ value, onChange, className }: ReplicaSelectProps) {
  const { state: replicasState, refetchReplicas } = useReplicas()
  const replicas = useActiveReplicas()
  const { toast } = useToast()

  const loading = replicasState.loading

  // Функция для обновления списка реплик
  const handleRefresh = async () => {
    try {
      await refetchReplicas()
    } catch (error) {
      console.error("Error refreshing replicas:", error)
      toast({
        title: "Error",
        description: "Failed to refresh replicas. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Автоматически выбрать первую реплику если нет выбранной
  useEffect(() => {
    if (replicas.length > 0 && !value) {
      onChange(replicas[0].uuid)
    }
  }, [replicas, value, onChange])

  return (
    <div className={className}>
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : replicas.length > 0 ? (
        <Select 
          value={value} 
          onValueChange={onChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a replica" />
          </SelectTrigger>
          <SelectContent>
            {replicas.map((replica) => (
              <SelectItem key={replica.uuid} value={replica.uuid}>
                {replica.name} ({replica.type})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="flex flex-col space-y-2">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter Replica UUID manually"
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
            className="w-full"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Load Replicas
          </Button>
        </div>
      )}
    </div>
  )
}
