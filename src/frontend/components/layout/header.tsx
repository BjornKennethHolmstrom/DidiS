// components/layout/header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'
import { User } from 'lucide-react'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

export function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
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
            {t.nav.about}
          </Link>
          <Link 
            href="/forslag"
            className={`text-sm ${
              pathname === '/forslag'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.nav.proposals}
          </Link>
          <Link 
            href="/dashboard"
            className={`text-sm ${
              pathname === '/dashboard'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.nav.myAccount}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher variant="minimal" />
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
                  {t.nav.myAccount}
                </Link>
                <Link 
                  href="/profil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.profile.title}
                </Link>
                <Link 
                  href="/installningar"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.settings.title}
                </Link>
                <hr className="my-1" />
                <button 
                  onClick={() => {/* Handle logout */}}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t.auth.signOut}
                </button>
              </div>
            )}
          </div>
          <Button>{t.auth.signIn}</Button>
        </div>
      </div>
    </header>
  )
}
