// hooks/useTranslations.ts
import { getLocale } from '../lib/language'
import { sv } from '../translations/sv'

const translations = {
  sv,
}

export function useTranslations() {
  const locale = getLocale()
  return translations[locale]
}
