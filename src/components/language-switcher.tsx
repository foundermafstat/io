"use client"

import { toast } from "sonner"
import { Languages } from "lucide-react"
import { useTranslations } from "@/components/translations-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { t, locale, setLocale } = useTranslations()

  const languages = [
    { code: 'en', label: 'English', icon: '🇬🇧' },
    { code: 'ru', label: 'Русский', icon: '🇷🇺' },
    { code: 'es', label: 'Español', icon: '🇪🇸' },
    { code: 'fr', label: 'Français', icon: '🇫🇷' },
    { code: 'zh', label: '中文', icon: '🇨🇳' },
  ]

  const selectedLanguage = languages.find(lang => lang.code === locale)

  const onSelect = (value: string) => {
    setLocale(value);
    toast.success(`${t('status.language')} ${locale}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem 
            key={language.code} 
            onClick={() => onSelect(language.code)}
            className={locale === language.code ? 'bg-accent' : ''}
          >
            {language.icon} {language.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 