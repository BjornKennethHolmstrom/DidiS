import { useState } from 'react';
import ApprovalVoteCard from '@/components/voting/approval-vote-card';
import { useTranslations } from '@/hooks/useTranslations';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ApprovalVoteExample() {
  const t = useTranslations();
  const [userVote, setUserVote] = useState<string[] | null>(null);
  
  // Example vote data
  const voteData = {
    id: '4',
    title: 'Platform Design Proposals',
    description: 'Approve any design proposals you feel would improve the platform.',
    startTime: new Date('2024-01-04T10:00:00'),
    endTime: new Date('2024-02-04T10:00:00'),
    options: [
      {
        id: 'design1',
        title: 'Minimalist Interface',
        description: 'Clean, simple interface with focus on content'
      },
      {
        id: 'design2',
        title: 'Rich Information Display',
        description: 'Detailed interface with comprehensive information'
      },
      {
        id: 'design3',
        title: 'Customizable Dashboard',
        description: 'User-configurable dashboard with widgets'
      },
      {
        id: 'design4',
        title: 'Traditional Navigation',
        description: 'Familiar menu-based navigation system'
      },
      {
        id: 'design5',
        title: 'Modern Card Layout',
        description: 'Card-based interface with visual hierarchy'
      }
    ],
    minApprovals: 1,
    requireResponse: true,
    totalVotes: 384
  };

  const handleVote = async (approvedOptionIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserVote(approvedOptionIds);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {t.voting.approval.name}
          </h1>
          
          <ApprovalVoteCard
            {...voteData}
            onVote={handleVote}
            userVote={userVote}
          />

          {userVote && (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4">
                  {t.voting.approval.yourApprovals}
                </h2>
                <ul className="space-y-2">
                  {voteData.options.map((option) => (
                    <li 
                      key={option.id}
                      className={cn(
                        'p-3 rounded-lg flex items-center gap-3',
                        userVote.includes(option.id) 
                          ? 'bg-green-50' 
                          : 'bg-neutral-50'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-full border-2 flex items-center justify-center',
                        userVote.includes(option.id)
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-neutral-300'
                      )}>
                        {userVote.includes(option.id) && (
                          <Check className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {option.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {userVote.includes(option.id)
                            ? t.voting.approval.approved
                            : t.voting.approval.disapproved}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="font-semibold mb-4">
              {t.voting.approval.instructions}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t.voting.approval.description}</li>
              {voteData.minApprovals > 0 ? (
                <li>• {t.voting.approval.minApprovalsRequired
                  .replace('{min}', voteData.minApprovals.toString())}</li>
              ) : (
                <li>• {t.voting.approval.noMinimum}</li>
              )}
              <li>• {t.voting.approval.instructions}</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
