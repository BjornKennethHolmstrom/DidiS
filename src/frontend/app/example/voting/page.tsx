import { useState } from 'react';
import VoteCard from '@/components/voting/vote-card';
import { useTranslations } from '@/hooks/useTranslations';

export default function VoteExample() {
  const t = useTranslations();
  const [userVote, setUserVote] = useState<string | null>(null);
  
  // Example vote data
  const voteData = {
    id: '1',
    title: 'Should we implement this voting system?',
    description: 'A vote on whether to proceed with the implementation of this digital voting system.',
    startTime: new Date('2024-01-04T10:00:00'),
    endTime: new Date('2024-02-04T10:00:00'),
    options: [
      {
        id: 'yes',
        title: t.voting.types.yes_no.options.yes,
        description: 'Proceed with the implementation'
      },
      {
        id: 'no',
        title: t.voting.types.yes_no.options.no,
        description: 'Do not proceed with the implementation'
      }
    ],
    totalVotes: 42
  };

  const handleVote = async (optionId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUserVote(optionId);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <VoteCard
        {...voteData}
        onVote={handleVote}
        userVote={userVote}
      />
    </div>
  );
}
