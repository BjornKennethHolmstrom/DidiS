'use client'

import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronRight, UserCheck, FileText, Vote, MessageSquare, PlayCircle, X } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface DemoContent {
  title: string;
  description: string;
  animation: React.ReactNode;
}

const demos: Record<number, DemoContent> = {
  1: {
    title: 'Säker inloggning med BankID',
    description: 'Använd BankID för att identifiera dig säkert och enkelt.',
    animation: (
      <div className="bg-neutral-50 p-8 rounded-lg text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
          <UserCheck className="h-8 w-8 text-primary" />
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-primary/20 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-primary/20 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    )
  },
  2: {
    title: 'Skapa och dela förslag',
    description: 'Formulera ditt förslag och dela det med andra medborgare.',
    animation: (
      <div className="bg-neutral-50 p-8 rounded-lg">
        <div className="space-y-4">
          <div className="h-8 bg-primary/20 rounded w-3/4"></div>
          <div className="h-4 bg-primary/20 rounded w-full"></div>
          <div className="h-4 bg-primary/20 rounded w-5/6"></div>
          <div className="h-4 bg-primary/20 rounded w-4/6"></div>
        </div>
      </div>
    )
  },
  3: {
    title: 'Delta i diskussioner',
    description: 'Engagera dig i konstruktiva dialoger om förslag.',
    animation: (
      <div className="bg-neutral-50 p-8 rounded-lg space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-primary/20 rounded w-3/4"></div>
            <div className="h-4 bg-primary/20 rounded w-1/2"></div>
          </div>
        </div>
        <div className="flex items-start space-x-4 pl-8">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-primary/20 rounded w-2/3"></div>
            <div className="h-4 bg-primary/20 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  },
  4: {
    title: 'Rösta och påverka',
    description: 'Ta ställning i viktiga frågor genom säker röstning.',
    animation: (
      <div className="bg-neutral-50 p-8 rounded-lg">
        <div className="space-y-6">
          <div className="h-8 bg-primary/20 rounded-full w-full"></div>
          <div className="h-8 bg-primary/20 rounded-full w-3/4"></div>
          <div className="h-8 bg-primary/20 rounded-full w-1/2"></div>
        </div>
      </div>
    )
  }
};

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
        <div className="max-w-5xl mx-auto">
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
 
        {/* How it works */}
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

        {/* Enhanced FAQ section */}
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t.getStarted.faq.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {t.getStarted.faq.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pt-2 pb-4">
                        {item.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Demo Modal */}
        {activeDemo && demos[activeDemo] && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    {demos[activeDemo].title}
                  </h3>
                  <button 
                    onClick={() => setActiveDemo(null)}
                    className="p-1 hover:bg-neutral-100 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-6">
                  {demos[activeDemo].description}
                </p>
                {demos[activeDemo].animation}
              </div>
              <div className="border-t p-4 flex justify-end">
                <Button onClick={() => setActiveDemo(null)}>
                  Stäng
                </Button>
              </div>
            </div>
          </div>
        )}
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
