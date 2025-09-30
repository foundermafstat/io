"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { en } from '@/lib/translations/en'
import { ru } from '@/lib/translations/ru'
import { es } from '@/lib/translations/es'
import { fr } from '@/lib/translations/fr'
import { zh } from '@/lib/translations/zh'

type TranslationValue = string | { [key: string]: TranslationValue }

type Translations = {
  [key: string]: TranslationValue
}

const translations: { [key: string]: Translations } = {
  en,
  ru,
  es,
  fr,
  zh
}

type TranslationsContextType = {
  t: (key: string, params?: Record<string, any>) => string
  getTranslation: (key: string) => any
  locale: string
  setLocale: (locale: string) => void
}

const TranslationsContext = createContext<TranslationsContextType | null>(null)

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split('.')
    let value: TranslationValue = translations[locale]

    for (const k of keys) {
      if (value === undefined) return key
      value = typeof value === 'object' ? value[k] : key
    }

    let result = typeof value === 'string' ? value : key

    // Интерполяция параметров
    if (params) {
      Object.keys(params).forEach(paramKey => {
        const placeholder = `{${paramKey}}`
        result = result.replace(new RegExp(placeholder, 'g'), params[paramKey])
      })
    }

    return result
  }

  const getTranslation = (key: string): any => {
    const keys = key.split('.')
    let value: TranslationValue = translations[locale]

    for (const k of keys) {
      if (value === undefined) return key
      value = typeof value === 'object' ? value[k] : key
    }

    return value
  }

  return (
    <TranslationsContext.Provider value={{ t, getTranslation, locale, setLocale }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider')
  }
  return context
} 