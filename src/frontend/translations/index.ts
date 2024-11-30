// src/translations/index.ts
import { sv } from './sv';
import { Translations } from './types';

// For now, we'll have a simple English translation that's identical to Swedish
// In a real application, you'd have proper translations
export const en: Translations = sv;

export const translations = {
  sv,
  en,
};
