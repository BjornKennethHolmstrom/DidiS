// components/layout/main-layout.tsx
'use client'

import { Header } from './header'
import { Footer } from './footer'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}
