// hooks/useTranslations.ts
'use client'

import { useLanguage } from '@/contexts/language-context'
import { translations } from '@/translations'

export function useTranslations() {
  const { locale } = useLanguage()
  return translations[locale]
}
