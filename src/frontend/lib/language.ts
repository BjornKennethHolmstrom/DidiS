// src/lib/language.ts
export const defaultLocale = 'sv'

export type Locale = 'sv' | 'en'  // Add more languages as needed

export function getLocale(): Locale {
  // For now, we'll just return Swedish, but this can be enhanced to:
  // 1. Check user preferences
  // 2. Check browser settings
  // 3. Allow manual selection
  return defaultLocale
}
