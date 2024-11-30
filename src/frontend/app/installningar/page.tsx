// app/installningar/page.tsx
'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Notification } from '@/components/ui/notification'
import { useTranslations } from '@/hooks/useTranslations'
import { Bell, Globe, Lock, Eye, Languages } from 'lucide-react'
import { LanguageSwitcher } from '@/components/ui/language-switcher';

interface SettingsState {
  notifications: {
    email: boolean
    sms: boolean
    proposals: boolean
    votes: boolean
    newsletter: boolean
  }
  privacy: {
    profileVisibility: boolean
    activityVisibility: boolean
    dataUsage: boolean
  }
  language: {
    interface: string
    content: string
    municipality: string
  }
}

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </Card>
  )
}

interface ToggleSettingProps {
  icon: React.ReactNode
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleSetting({ icon, label, checked, onChange }: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default function SettingsPage() {
  const t = useTranslations()
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  
  const [settings, setSettings] = useState<SettingsState>({
    notifications: {
      email: true,
      sms: false,
      proposals: true,
      votes: true,
      newsletter: false
    },
    privacy: {
      profileVisibility: true,
      activityVisibility: true,
      dataUsage: false
    },
    language: {
      interface: 'Svenska',
      content: 'Svenska',
      municipality: 'Stockholm'
    }
  })

  const handleSave = async () => {
    try {
      // Here you would typically save to backend
      console.log('Saving settings:', settings)
      setNotification({
        type: 'success',
        message: t.settings?.messages?.saveSuccess
      })
    } catch (error) {
      setNotification({
        type: 'error',
        message: t.settings?.messages?.saveError
      })
    }
  }

  const updateNotificationSetting = (key: keyof typeof settings.notifications) => (value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const updatePrivacySetting = (key: keyof typeof settings.privacy) => (value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }))
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t.settings?.title}</h1>
          </div>

          <div className="space-y-6">
            {/* Notifications */}
            <SettingsSection title={t.settings?.sections.notifications.title}>
              <ToggleSetting
                icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.notifications.emailNotifications}
                checked={settings.notifications.email}
                onChange={updateNotificationSetting('email')}
              />
              <ToggleSetting
                icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.notifications.smsNotifications}
                checked={settings.notifications.sms}
                onChange={updateNotificationSetting('sms')}
              />
              <ToggleSetting
                icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.notifications.proposalUpdates}
                checked={settings.notifications.proposals}
                onChange={updateNotificationSetting('proposals')}
              />
              <ToggleSetting
                icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.notifications.voteReminders}
                checked={settings.notifications.votes}
                onChange={updateNotificationSetting('votes')}
              />
              <ToggleSetting
                icon={<Bell className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.notifications.newsletterUpdates}
                checked={settings.notifications.newsletter}
                onChange={updateNotificationSetting('newsletter')}
              />
            </SettingsSection>

            {/* Privacy & Security */}
            <SettingsSection title={t.settings?.sections.privacy.title}>
              <ToggleSetting
                icon={<Eye className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.privacy.profileVisibility}
                checked={settings.privacy.profileVisibility}
                onChange={updatePrivacySetting('profileVisibility')}
              />
              <ToggleSetting
                icon={<Eye className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.privacy.activityVisibility}
                checked={settings.privacy.activityVisibility}
                onChange={updatePrivacySetting('activityVisibility')}
              />
              <ToggleSetting
                icon={<Lock className="h-5 w-5 text-muted-foreground" />}
                label={t.settings?.sections.privacy.dataUsage}
                checked={settings.privacy.dataUsage}
                onChange={updatePrivacySetting('dataUsage')}
              />
            </SettingsSection>

            {/* Language & Region */}
            <SettingsSection title={t.settings?.sections.language.title}>
              <LanguageSwitcher variant="full" />
            </SettingsSection>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => window.location.reload()}>
                {t.settings?.buttons.reset}
              </Button>
              <Button onClick={handleSave}>
                {t.settings?.buttons.save}
              </Button>
            </div>
          </div>

          {notification && (
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          )}
        </div>
      </div>
    </MainLayout>
  )
}
