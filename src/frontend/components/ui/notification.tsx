// components/ui/notification.tsx
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

interface NotificationProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
}

export function Notification({ type, message, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-green-50' : 'bg-red-50'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'
  const Icon = type === 'success' ? CheckCircle : XCircle

  return (
    <div className={`fixed bottom-4 right-4 w-96 ${bgColor} p-4 rounded-lg shadow-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${textColor}`} />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onClose}
            className={`inline-flex ${textColor} hover:opacity-75`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
