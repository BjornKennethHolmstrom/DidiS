'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { useTranslations } from '@/hooks/useTranslations'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CategorySelector } from '@/components/proposals/category-selector'
import { categories, subCategories } from '@/data/categories'

interface ProposalForm {
  title: string
  summary: string
  content: string
  categoryId: string
  subCategoryId?: string
  tags: string[]
}

const initialForm: ProposalForm = {
  title: '',
  summary: '',
  content: '',
  categoryId: '',
  subCategoryId: '',
  tags: []
}

export default function NewProposalPage() {
  const t = useTranslations()
  const [form, setForm] = useState<ProposalForm>(initialForm)
  const [errors, setErrors] = useState<Partial<ProposalForm>>({})

  const handleTextChange = (field: keyof ProposalForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({
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

  const handleContentChange = (content: string) => {
    setForm(prev => ({
      ...prev,
      content
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors: Partial<ProposalForm> = {}
    if (!form.title.trim()) {
      newErrors.title = 'Titel krävs'
    }
    if (!form.summary.trim()) {
      newErrors.summary = 'Sammanfattning krävs'
    }
    if (!form.content.trim()) {
      newErrors.content = 'Innehåll krävs'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // TODO: Handle submission
    console.log('Form submitted:', form)
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {t.proposals?.create?.title || 'Skapa nytt förslag'}
          </h1>
          <Breadcrumb 
            items={[
              { label: t.proposals.title, href: '/forslag' },
              { label: t.proposals.create.title }
            ]} 
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>{t.proposals?.create?.basicInfo || 'Grundläggande information'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="title">
                    {t.proposals?.create?.titleLabel || 'Titel'}
                  </label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={handleTextChange('title')}
                    error={errors.title}
                    placeholder="Ange en beskrivande titel för ditt förslag"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="summary">
                    {t.proposals?.create?.summaryLabel || 'Sammanfattning'}
                  </label>
                  <Input
                    id="summary"
                    value={form.summary}
                    onChange={handleTextChange('summary')}
                    error={errors.summary}
                    placeholder="Beskriv kort vad ditt förslag handlar om"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Category Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t.proposals?.create?.category || 'Kategori'}</CardTitle>
              </CardHeader>
              <CardContent>
                <CategorySelector
                  categories={categories}
                  subCategories={subCategories}
                  selectedCategory={form.categoryId}
                  selectedSubCategory={form.subCategoryId}
                  onCategoryChange={(categoryId) => {
                    setForm(prev => ({
                      ...prev,
                      categoryId,
                      subCategoryId: '' // Reset subcategory when category changes
                    }))
                  }}
                  onSubCategoryChange={(subCategoryId) => {
                    setForm(prev => ({
                      ...prev,
                      subCategoryId
                    }))
                  }}
                />
                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-500">{errors.categoryId}</p>
                )}
              </CardContent>
            </Card>

            {/* Detailed Content */}
            <Card>
              <CardHeader>
                <CardTitle>{t.proposals?.create?.content || 'Innehåll'}</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  value={form.content}
                  onChange={handleContentChange}
                  placeholder="Beskriv ditt förslag i detalj..."
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-500">{errors.content}</p>
                )}
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                {t.common?.actions?.cancel || 'Avbryt'}
              </Button>
              <Button type="submit">
                {t.proposals?.create?.submit || 'Skapa förslag'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
