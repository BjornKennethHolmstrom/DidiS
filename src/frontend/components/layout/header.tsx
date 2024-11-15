// components/layout/header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/hooks/useTranslations'

export function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          {t.common.appName}
        </Link>
        <nav className="flex items-center gap-4">
          <Link 
            href="/om-oss" 
            className={`text-neutral-600 hover:text-neutral-900 ${
              pathname === '/om-oss' ? 'text-neutral-900' : ''
            }`}
          >
            {t.nav.about}
          </Link>
          <Link 
            href="/forslag"
            className={`text-neutral-600 hover:text-neutral-900 ${
              pathname === '/forslag' ? 'text-neutral-900' : ''
            }`}
          >
            {t.nav.proposals}
          </Link>
          <Link 
            href="/dashboard"
            className={`text-neutral-600 hover:text-neutral-900 ${
              pathname === '/dashboard' ? 'text-neutral-900' : ''
            }`}
          >
            {t.nav.myAccount}
          </Link>
          <Button size="sm">
            {t.common.signIn}
          </Button>
        </nav>
      </div>
    </header>
  )
}
