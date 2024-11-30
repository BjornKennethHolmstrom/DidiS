// contexts/language-context.tsx
'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Locale, defaultLocale } from '@/lib/language';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const handleSetLocale = useCallback((newLocale: Locale) => {
    setLocale(newLocale);
    // Optionally persist the language choice
    localStorage.setItem('preferred-language', newLocale);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
