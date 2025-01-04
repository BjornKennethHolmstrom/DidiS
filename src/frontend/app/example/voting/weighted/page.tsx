import { useState } from 'react';
import WeightedVoteCard from '@/components/voting/weighted-vote-card';
import { useTranslations } from '@/hooks/useTranslations';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent } from '@/components/ui/card';

export default function WeightedVoteExample() {
  const t = useTranslations();
  const [userVote, setUserVote] = useState<{ [key: string]: number } | null>(null);
  
  // Example vote data
  const voteData = {
    id: '5',
    title: 'Budget Distribution for Development',
    description: 'Distribute development resources among different areas by allocating points.',
    startTime: new Date('2024-01-04T10:00:00'),
    endTime: new Date('2024-02-04T10:00:00'),
    options: [
      {
        id: 'frontend',
        title: 'Frontend Development',
        description: 'User interface and experience improvements'
      },
      {
        id: 'backend',
        title: 'Backend Development',
        description: 'Server infrastructure and API improvements'
      },
      {
        id: 'security',
        title: 'Security Enhancements',
        description: 'Security audits and improvements'
      },
      {
        id: 'testing',
        title: 'Testing Infrastructure',
        description: 'Automated testing and quality assurance'
      },
      {
        id: 'documentation',
        title: 'Documentation',
        description: 'Technical documentation and user guides'
      }
    ],
    totalPoints: 100,
    minPointsPerOption: 0,
    maxPointsPerOption: 100,
    allowAbstain: true,
    totalVotes: 156
  };

  const handleVote = async (weightedVotes: { [key: string]: number }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserVote(weightedVotes);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {t.voting.weighted.name}
          </h1>
          
          <WeightedVoteCard
            {...voteData}
            onVote={handleVote}
            userVote={userVote}
          />

          {userVote && (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h2 className="font-semibold mb-4">
                  {t.voting.weighted.yourDistribution}
                </h2>
                <div className="space-y-4">
                  {voteData.options.map((option) => (
                    <div key={option.id} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{option.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {userVote[option.id]} {t.voting.weighted.points}
                        </span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${(userVote[option.id] / voteData.totalPoints) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <h2 className="font-semibold mb-4">
              {t.voting.weighted.instructions.title}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {t.voting.weighted.instructions.distribute
                .replace('{total}', voteData.totalPoints.toString())}</li>
              <li>• {t.voting.weighted.instructions.limits
                .replace('{min}', voteData.minPointsPerOption.toString())
                .replace('{max}', voteData.maxPointsPerOption.toString())}</li>
              <li>• {t.voting.weighted.instructions.remaining}</li>
              {voteData.allowAbstain && (
                <li>• {t.voting.weighted.instructions.abstain}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
