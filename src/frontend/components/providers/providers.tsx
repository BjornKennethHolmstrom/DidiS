// src/components/providers/providers.tsx
'use client'

import React from 'react'
import { LanguageProvider } from '@/contexts/language-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      {children}
    </LanguageProvider>
  )
}
