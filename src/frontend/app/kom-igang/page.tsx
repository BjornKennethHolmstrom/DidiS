'use client'

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight, UserCheck, FileText, Vote, MessageSquare, PlayCircle } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

export default function GetStartedPage() {
  const t = useTranslations();
  const [activeDemo, setActiveDemo] = useState<number | null>(null);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            {t.getStarted.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t.getStarted.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              {t.getStarted.cta.primary}
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              {t.getStarted.cta.secondary}
            </Button>
          </div>
        </div>

        {/* Quick Start Steps */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            {t.getStarted.stepsTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StepCard 
              number={1}
              icon={<UserCheck className="h-6 w-6" />}
              title={t.getStarted.steps.identify.title}
              description={t.getStarted.steps.identify.description}
              onDemoClick={() => setActiveDemo(1)}
            />
            <StepCard 
              number={2}
              icon={<FileText className="h-6 w-6" />}
              title={t.getStarted.steps.propose.title}
              description={t.getStarted.steps.propose.description}
              onDemoClick={() => setActiveDemo(2)}
            />
            <StepCard 
              number={3}
              icon={<MessageSquare className="h-6 w-6" />}
              title={t.getStarted.steps.discuss.title}
              description={t.getStarted.steps.discuss.description}
              onDemoClick={() => setActiveDemo(3)}
            />
            <StepCard 
              number={4}
              icon={<Vote className="h-6 w-6" />}
              title={t.getStarted.steps.vote.title}
              description={t.getStarted.steps.vote.description}
              onDemoClick={() => setActiveDemo(4)}
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>{t.getStarted.howItWorks.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 mb-4">
                {t.getStarted.howItWorks.description}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                {t.getStarted.howItWorks.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Example Cases */}
        <div className="max-w-3xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>{t.getStarted.examples.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {t.getStarted.examples.cases.map((example, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted">
                    <h3 className="font-semibold mb-2">{example.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{example.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{example.status}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{example.participants} deltagare</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t.getStarted.faq.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {t.getStarted.faq.items.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

function StepCard({ 
  number, 
  icon, 
  title, 
  description,
  onDemoClick 
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  onDemoClick?: () => void;
}) {
  return (
    <Card className="relative">
      <CardContent className="pt-6">
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
          {number}
        </div>
        <div className="mb-4 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        {onDemoClick && (
          <button 
            onClick={onDemoClick}
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <PlayCircle className="h-4 w-4 mr-1" />
            Se demo
          </button>
        )}
      </CardContent>
    </Card>
  );
}
