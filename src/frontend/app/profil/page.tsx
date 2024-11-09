// app/profil/page.tsx
'use client'

import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Toggle } from '@/components/ui/toggle'
import { Notification } from '@/components/ui/notification'
import { MapPin, Mail, Phone, Bell } from 'lucide-react'
import { MainLayout } from '@/components/layout/main-layout'
import { ProfileSection } from '@/features/profile/components/profile-section'
import { ActivityList } from '@/features/profile/components/activity-list'
import { InterestTag } from '@/features/profile/components/interest-tag'

interface ProfileFormData {
  name: string
  email: string
  phone: string
  municipality: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  municipality?: string
}

interface Notification {
  type: 'success' | 'error'
  message: string
}

export default function ProfilePage() {
  const t = useTranslations()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    name: 'Anna Andersson',
    email: 'anna.andersson@example.com',
    phone: '0701234567',
    municipality: 'Stockholm'
  })
  const [errors, setErrors] = useState<FormErrors>({})
  
  const recentActivities = [
    {
      type: 'Förslag',
      title: 'Förbättring av cykelvägar i centrum',
      date: '2024-11-09',
      status: 'Aktiv'
    },
    {
      type: 'Röstning',
      title: 'Ny lekplats i stadsparken',
      date: '2024-11-08',
      status: 'Avslutad'
    },
    {
      type: 'Kommentar',
      title: 'Miljöinitiativ för renare luft',
      date: '2024-11-07',
      status: 'Aktiv'
    }
  ]

  const [notification, setNotification] = useState<Notification | null>(null)
  const interests = [
    'Miljö',
    'Trafik',
    'Kultur',
    'Utbildning',
    'Hälsa'
  ]
  const [newInterest, setNewInterest] = useState('')
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (formData.name.length < 2) {
      newErrors.name = 'Namnet måste vara minst 2 tecken'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress'
    }

    if (!/^07[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone = 'Ogiltigt telefonnummer'
    }

    if (formData.municipality.length < 2) {
      newErrors.municipality = 'Kommunen måste vara minst 2 tecken'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form data:', formData)
      setIsEditing(false)
      setNotification({
        type: 'success',
        message: 'Profilen har uppdaterats'
      })
    } else {
      setNotification({
        type: 'error',
        message: 'Vänligen kontrollera de markerade fälten'
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      name: 'Anna Andersson',
      email: 'anna.andersson@example.com',
      phone: '0701234567',
      municipality: 'Stockholm'
    })
    setErrors({})
    setIsEditing(false)
  }

  const handleChange = (field: keyof ProfileFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()])
      setNewInterest('')
    }
  }

  const handleRemoveInterest = (index: number) => {
    setInterests(interests.filter((_, i) => i !== index))
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t.profile?.title || 'Min profil'}</h1>
            <Button 
              variant={isEditing ? 'outline' : 'default'}
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            >
              {isEditing ? t.profile?.buttons?.cancel : t.profile?.buttons?.edit}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <div className="p-6">
                <ProfileSection title={t.profile?.personalInfo?.title || 'Personuppgifter'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.profile?.personalInfo?.name}
                      </label>
                      <Input
                        value={formData.name}
                        onChange={handleChange('name')}
                        disabled={!isEditing}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.profile?.personalInfo?.email}
                      </label>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                        <Input
                          value={formData.email}
                          onChange={handleChange('email')}
                          disabled={!isEditing}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.profile?.personalInfo?.phone}
                      </label>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                        <Input
                          value={formData.phone}
                          onChange={handleChange('phone')}
                          disabled={!isEditing}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        {t.profile?.personalInfo?.municipality}
                      </label>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                        <Input
                          value={formData.municipality}
                          onChange={handleChange('municipality')}
                          disabled={!isEditing}
                          className={errors.municipality ? 'border-red-500' : ''}
                        />
                      </div>
                      {errors.municipality && (
                        <p className="mt-1 text-sm text-red-500">{errors.municipality}</p>
                      )}
                    </div>
                  </div>
                </ProfileSection>
              </div>
            </Card>

            {/* Rest of the components remain the same */}
            {/* Recent Activity */}
            <Card>
              <div className="p-6">
                <ProfileSection title={t.profile?.activity?.title || 'Aktivitet'}>
                  <ActivityList activities={recentActivities} />
                </ProfileSection>
              </div>
            </Card>

            {/* Interests */}
            <Card>
              <div className="p-6">
                <ProfileSection title={t.profile?.interests?.title || 'Intresseområden'}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <InterestTag
                          key={index}
                          interest={interest}
                          isEditing={isEditing}
                          onRemove={() => handleRemoveInterest(index)}
                        />
                      ))}
                    </div>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Nytt intresseområde..."
                          className="max-w-xs"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleAddInterest}
                        >
                          Lägg till
                        </Button>
                      </div>
                    )}
                  </div>
                </ProfileSection>
              </div>
            </Card>

            {isEditing && (
              <div className="flex justify-end">
                <Button type="submit">
                  {t.profile?.buttons?.save}
                </Button>
              </div>
            )}
          </form>
        </div>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

      </div>
    </MainLayout>
  )
}
