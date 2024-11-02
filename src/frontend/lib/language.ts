// src/lib/language.ts
export const defaultLocale = 'sv'

export type Locale = 'sv'

export function getLocale(): Locale {
  return defaultLocale // For now, we'll just return Swedish
}
