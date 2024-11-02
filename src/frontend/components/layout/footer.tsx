// src/components/layout/footer.tsx
'use client'

import { useTranslations } from '@/hooks/useTranslations'

export function Footer() {
  const t = useTranslations()
  
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <p className="text-sm text-neutral-600">
          {t.footer.rights.replace('{year}', new Date().getFullYear().toString())}
        </p>
      </div>
    </footer>
  )
}
