'use client'

import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from '@/hooks/useTranslations';
import { useLanguage } from '@/contexts/language-context';
import { Locale } from '@/lib/language';

interface LanguageSwitcherProps {
  variant?: 'minimal' | 'full';
}

export function LanguageSwitcher({ variant = 'minimal' }: LanguageSwitcherProps) {
  const t = useTranslations();
  const { locale, setLocale } = useLanguage();

  const handleLanguageChange = (newLocale: Locale) => {
    setLocale(newLocale);
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => handleLanguageChange(locale === 'sv' ? 'en' : 'sv')}
        >
          <Globe className="h-4 w-4" />
          <span>{locale.toUpperCase()}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-muted-foreground" />
        <select 
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={locale}
          onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        >
          <option value="sv">Svenska</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}
