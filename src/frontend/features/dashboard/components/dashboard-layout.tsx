// features/dashboard/components/dashboard-layout.tsx
import { Settings, Bell, User } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const t = useTranslations()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
