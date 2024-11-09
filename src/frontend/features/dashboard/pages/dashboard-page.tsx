// features/dashboard/pages/dashboard-page.tsx
import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { DataTable } from '@/components/ui/data-table'
import { ActivityChart } from '@/components/ui/activity-chart'
import { Modal } from '@/components/ui/modal'
import { Card } from '@/components/ui/card'
import { Bell, Settings } from 'lucide-react'

export function DashboardPage() {
  const t = useTranslations()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const tableData = [
    { id: 1, name: 'Miljöförslag', status: 'Aktiv', date: '2024-11-09' },
    { id: 2, name: 'Trafikplanering', status: 'Under granskning', date: '2024-11-08' },
    { id: 3, name: 'Parkutveckling', status: 'Avslutad', date: '2024-11-07' }
  ]
  
  const tableColumns = [
    { key: 'id', header: t.dashboard.table.columns.id, width: '10%' },
    { key: 'name', header: t.dashboard.table.columns.name, width: '40%' },
    { key: 'status', header: t.dashboard.table.columns.status, width: '25%' },
    { key: 'date', header: t.dashboard.table.columns.date, width: '25%' }
  ]
  
  const chartData = [
    { name: 'Jan', proposals: 4, votes: 65 },
    { name: 'Feb', proposals: 3, votes: 45 },
    { name: 'Mar', proposals: 5, votes: 80 }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t.dashboard.chart.title}
              </h2>
              <ActivityChart data={chartData} className="w-full h-64" />
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {t.dashboard.table.title}
              </h2>
              <DataTable 
                data={tableData}
                columns={tableColumns}
              />
            </div>
          </Card>
        </div>

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          title={t.dashboard.notifications}
        >
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded">
              <p>Notification content would go here</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              {t.common.actions.primary}
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
