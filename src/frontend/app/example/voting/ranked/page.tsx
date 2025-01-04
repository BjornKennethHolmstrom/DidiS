import { useState } from 'react';
import RankedVoteCard from '@/components/voting/ranked-vote-card';
import { useTranslations } from '@/hooks/useTranslations';
import { MainLayout } from '@/components/layout/main-layout';

export default function RankedVoteExample() {
  const t = useTranslations();
  const [userVote, setUserVote] = useState<string[] | null>(null);
  
  // Example vote data
  const voteData = {
    id: '2',
    title: 'Which features should we implement first?',
    description: 'Rank the following features in order of priority for implementation.',
    startTime: new Date('2024-01-04T10:00:00'),
    endTime: new Date('2024-02-04T10:00:00'),
    options: [
      {
        id: 'feature1',
        title: 'BankID Integration',
        description: 'Secure authentication using BankID'
      },
      {
        id: 'feature2',
        title: 'Municipality Integration',
        description: 'Integration with municipal systems'
      },
      {
        id: 'feature3',
        title: 'Mobile App',
        description: 'Native mobile application'
      },
      {
        id: 'feature4',
        title: 'Analytics Dashboard',
        description: 'Advanced analytics and reporting'
      },
      {
        id: 'feature5',
        title: 'API Documentation',
        description: 'Comprehensive API documentation'
      }
    ],
    minRanked: 3,
    maxRanked: 5,
    totalVotes: 128
  };

  const handleVote = async (rankedOptionIds: string[]) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserVote(rankedOptionIds);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            {t.voting.ranked.name}
          </h1>
          
          <RankedVoteCard
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
                {t.voting.ranked.yourRanking}:
              </p>
              <ol className="mt-2 space-y-2">
                {userVote.map((optionId, index) => {
                  const option = voteData.options.find(opt => opt.id === optionId);
                  return (
                    <li key={optionId} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span>{option?.title}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
