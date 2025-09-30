import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/components/translations-context";

interface BroadcastButtonProps {
  isSessionActive: boolean
  onClick: () => void
  disabled?: boolean
}

export function BroadcastButton({ isSessionActive, onClick, disabled = false }: BroadcastButtonProps) {
  const { t } = useTranslations();
  return (
    <Button
      variant={isSessionActive ? "destructive" : "default"}
      className="w-full py-6 text-lg font-medium flex items-center justify-center gap-2 motion-preset-shake"
      onClick={onClick}
      disabled={disabled}
    >
      {isSessionActive && (
        <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-700">
          {t('broadcast.live')}
        </Badge>
      )}
      {isSessionActive ? t('broadcast.end') : t('broadcast.start')}
    </Button>
  )
} 