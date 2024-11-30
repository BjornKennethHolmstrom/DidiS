import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Globe, Lock, Users, Building, Code, Heart } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

export default function AboutPage() {
  const t = useTranslations();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {t.about.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t.about.subtitle}
          </p>
        </div>

        {/* Vision Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>{t.about.vision.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                {t.about.vision.content}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Features Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            {t.about.features.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Lock />}
              title={t.about.features.items.auth.title}
              description={t.about.features.items.auth.description}
            />
            <FeatureCard 
              icon={<Globe />}
              title={t.about.features.items.accessibility.title}
              description={t.about.features.items.accessibility.description}
            />
            <FeatureCard 
              icon={<Users />}
              title={t.about.features.items.proposals.title}
              description={t.about.features.items.proposals.description}
            />
            <FeatureCard 
              icon={<Building />}
              title={t.about.features.items.municipal.title}
              description={t.about.features.items.municipal.description}
            />
            <FeatureCard 
              icon={<Code />}
              title={t.about.features.items.openSource.title}
              description={t.about.features.items.openSource.description}
            />
            <FeatureCard 
              icon={<Heart />}
              title={t.about.features.items.engagement.title}
              description={t.about.features.items.engagement.description}
            />
          </div>
        </div>

        {/* Principles Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>{t.about.principles.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="leading-7">
                <strong>{t.about.principles.openness.title}</strong><br />
                {t.about.principles.openness.content}
              </p>
              <p className="leading-7">
                <strong>{t.about.principles.security.title}</strong><br />
                {t.about.principles.security.content}
              </p>
              <p className="leading-7">
                <strong>{t.about.principles.accessibility.title}</strong><br />
                {t.about.principles.accessibility.content}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Future Vision */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t.about.future.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7">
                {t.about.future.content}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
