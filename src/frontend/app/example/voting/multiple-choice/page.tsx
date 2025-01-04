import { useState } from 'react';
import MultipleChoiceCard from '@/components/voting/multiple-choice-card';
import { useTranslations } from '@/hooks/useTranslations';
import { MainLayout } from '@/components/layout/main-layout';
import { CheckCircle2 } from 'lucide-react';

export default function MultipleChoiceExample() {
  const t = useTranslations();
  const [userVote, setUserVote] = useState<string[] | null>(null);
  
  // Example vote data
  const voteData = {
    id: '3',
    title: 'Which accessibility features should we prioritize?',
    description: 'Select up to three accessibility features to implement in the next release.',
    startTime: new Date('2024-01-04T10:00:00'),
    endTime: new Date('2024-02-04T10:00:00'),
    options: [
      {
        id: 'feature1',
        title: 'Screen Reader Optimization',
        description: 'Enhance screen reader compatibility and ARIA labels'
      },
      {
        id: 'feature2',
        title: 'Keyboard Navigation',
        description: 'Improve keyboard navigation and focus management'
      },
      {
        id: 'feature3',
        title: 'High Contrast Mode',
        description: 'Add high contrast theme option'
      },
      {
        id: 'feature4',
        title: 'Font Size Controls',
        description: 'Add controls for adjusting text size'
      },
      {
        id: 'feature5',
        title: 'Color Blind Support',
        description: 'Add color schemes optimized for color blindness'
      }
    ],
    minChoices: 1,
    maxChoices: 3,
    allowAbstain: true,
    totalVotes: 256
  };

  const handleVote = async (optionIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserVote(optionIds);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {t.voting.multipleChoice.name}
          </h1>
          
          <MultipleChoiceCard
            {...voteData}
            onVote={handleVote}
            userVote={userVote}
          />

          {userVote && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <h2 className="font-semibold mb-2">
                {t.voting.messages.voteSuccess}
              </h2>
              <p className="text-sm text-muted-foreground">
                {userVote.length === 1 
                  ? t.voting.multipleChoice.yourSelection
                  : t.voting.multipleChoice.yourSelections}:
              </p>
              <ul className="mt-2 space-y-2">
                {userVote.map((optionId) => {
                  const option = voteData.options.find(opt => opt.id === optionId);
                  return (
                    <li key={optionId} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>{option?.title}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-semibold mb-4">{t.voting.multipleChoice.instructions}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t.voting.multipleChoice.minSelectionsRequired.replace('{min}', voteData.minChoices.toString())}</li>
              <li>• {t.voting.multipleChoice.maxSelectionsInfo.replace('{max}', voteData.maxChoices.toString())}</li>
              {voteData.allowAbstain && (
                <li>• {t.voting.multipleChoice.abstainOption}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
