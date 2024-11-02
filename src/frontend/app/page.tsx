// src/app/page.tsx
'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

export default function Home() {
  const t = useTranslations()
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            {t.home.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-600">
            {t.home.subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg">{t.home.cta.primary}</Button>
            <Button variant="outline" size="lg">
              {t.home.cta.secondary}
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
