// app/design/page.tsx
'use client'

import { MainLayout } from '@/components/layout/main-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useTranslations } from '@/hooks/useTranslations'

export default function DesignSystem() {
  const t = useTranslations()

  return (
    <MainLayout>
      <div className="container mx-auto py-12 space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t.designSystem.title}</h1>
          <p className="text-muted-foreground">{t.designSystem.description}</p>
        </div>

        {/* Buttons */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.designSystem.buttons.title}</h2>
            <p className="text-muted-foreground mb-4">{t.designSystem.buttons.description}</p>
          </div>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.designSystem.buttons.variants}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button variant="default">{t.common.actions.primary}</Button>
                  <Button variant="secondary">{t.common.actions.secondary}</Button>
                  <Button variant="outline">{t.common.actions.outline}</Button>
                  <Button variant="ghost">{t.common.actions.ghost}</Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>{t.designSystem.buttons.states}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button disabled>{t.common.states.disabled}</Button>
                  <Button loading={true}>{t.common.states.loading}</Button>
                </CardContent>
              </Card>
            </div>
        </section>

        {/* Form Controls */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.designSystem.forms.title}</h2>
            <p className="text-muted-foreground mb-4">{t.designSystem.forms.description}</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t.designSystem.forms.inputs}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-sm">
              <Input placeholder={t.common.placeholders.default} />
              <Input placeholder={t.common.placeholders.error} error={t.common.errors.required} />
              <Input placeholder={t.common.placeholders.disabled} disabled />
            </CardContent>
          </Card>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{t.designSystem.cards.title}</h2>
            <p className="text-muted-foreground mb-4">{t.designSystem.cards.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.designSystem.cards.example.title}</CardTitle>
                <CardDescription>{t.designSystem.cards.example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{t.designSystem.cards.example.content}</p>
              </CardContent>
              <CardFooter>
                <Button>{t.common.actions.primary}</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
