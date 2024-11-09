// components/layout/main-layout.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'
import { Settings, User } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const t = useTranslations()
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-foreground">
              DidiS
            </Link>
            <Link 
              href="/om-oss" 
              className={`text-sm ${
                pathname === '/om-oss' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Om oss
            </Link>
            <Link 
              href="/forslag"
              className={`text-sm ${
                pathname === '/forslag'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Förslag
            </Link>
            <Link 
              href="/dashboard"
              className={`text-sm ${
                pathname === '/dashboard'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Min översikt
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <User className="h-5 w-5" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
                  <Link 
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Min översikt
                  </Link>
                  <Link 
                    href="/profil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                  <Link 
                    href="/installningar"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Inställningar
                  </Link>
                  <hr className="my-1" />
                  <button 
                    onClick={() => {/* Handle logout */}}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logga ut
                  </button>
                </div>
              )}
            </div>
            <Button>Logga in</Button>
          </div>
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
