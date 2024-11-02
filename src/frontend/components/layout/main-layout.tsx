// components/layout/main-layout.tsx
'use client'

import { Button } from '@/components/ui/button'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-xl font-bold text-foreground">DidiS</a>
            <a href="/om-oss" className="text-sm text-muted-foreground hover:text-foreground">Om oss</a>
            <a href="/forslag" className="text-sm text-muted-foreground hover:text-foreground">Förslag</a>
          </nav>
          <Button>Logga in</Button>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="border-t bg-white mt-auto">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DidiS. Alla rättigheter förbehållna
          </p>
        </div>
      </footer>
    </div>
  )
}
