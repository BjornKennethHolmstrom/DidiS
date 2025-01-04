import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, ArrowUp, ArrowDown, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

interface RankedOption extends VoteOption {
  rank?: number;
}

interface RankedVoteCardProps {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  options: RankedOption[];
  minRanked?: number;
  maxRanked?: number;
  totalVotes?: number;
  onVote?: (rankedOptionIds: string[]) => void;
  userVote?: string[]; // Array of option IDs in ranked order
  className?: string;
}

export default function RankedVoteCard({
  id,
  title,
  description,
  startTime,
  endTime,
  options: initialOptions,
  minRanked = 1,
  maxRanked,
  totalVotes = 0,
  onVote,
  userVote,
  className
}: RankedVoteCardProps) {
  const t = useTranslations();
  const [options, setOptions] = useState<RankedOption[]>(() => {
    if (userVote) {
      // If user has voted, order options according to their vote
      return userVote.map((id, index) => ({
        ...initialOptions.find(opt => opt.id === id)!,
        rank: index + 1
      })).concat(
        initialOptions.filter(opt => !userVote.includes(opt.id))
      );
    }
    return initialOptions;
  });
  const [isVoting, setIsVoting] = useState(false);

  const now = new Date();
  const hasStarted = now >= startTime;
  const hasEnded = now >= endTime;
  const canVote = hasStarted && !hasEnded && !userVote;

  const getVoteStatus = () => {
    if (!hasStarted) {
      return {
        label: t.voting.status.notStarted,
        icon: <AlertTriangle className="h-4 w-4" />,
        color: 'text-yellow-600 bg-yellow-50'
      };
    }
    if (hasEnded) {
      return {
        label: t.voting.status.ended,
        icon: <Info className="h-4 w-4" />,
        color: 'text-neutral-600 bg-neutral-50'
      };
    }
    if (userVote) {
      return {
        label: t.voting.status.voted,
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: 'text-green-600 bg-green-50'
      };
    }
    return {
      label: t.voting.status.active,
      icon: <Info className="h-4 w-4" />,
      color: 'text-blue-600 bg-blue-50'
    };
  };

  const moveOption = (index: number, direction: 'up' | 'down') => {
    const newOptions = [...options];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex < 0 || newIndex >= options.length) return;
    
    const oldRank = options[index].rank;
    const newRank = options[newIndex].rank;
    
    // Swap ranks
    newOptions[index] = { ...options[index], rank: newRank };
    newOptions[newIndex] = { ...options[newIndex], rank: oldRank };
    
    // Sort by rank
    newOptions.sort((a, b) => {
      if (!a.rank && !b.rank) return 0;
      if (!a.rank) return 1;
      if (!b.rank) return -1;
      return a.rank - b.rank;
    });
    
    setOptions(newOptions);
  };

  const toggleRank = (index: number) => {
    if (!canVote) return;

    const newOptions = [...options];
    const option = newOptions[index];
    
    if (option.rank) {
      // Remove rank
      newOptions.forEach(opt => {
        if (opt.rank && opt.rank > option.rank!) {
          opt.rank -= 1;
        }
      });
      option.rank = undefined;
    } else {
      // Add rank
      const rankedCount = newOptions.filter(opt => opt.rank).length;
      if (maxRanked && rankedCount >= maxRanked) return;
      option.rank = rankedCount + 1;
    }

    newOptions.sort((a, b) => {
      if (!a.rank && !b.rank) return 0;
      if (!a.rank) return 1;
      if (!b.rank) return -1;
      return a.rank - b.rank;
    });

    setOptions(newOptions);
  };

  const handleVote = async () => {
    if (!onVote) return;
    
    const rankedOptions = options
      .filter(opt => opt.rank)
      .sort((a, b) => (a.rank || 0) - (b.rank || 0));

    if (rankedOptions.length < minRanked) return;
    
    setIsVoting(true);
    try {
      await onVote(rankedOptions.map(opt => opt.id));
    } finally {
      setIsVoting(false);
    }
  };

  const status = getVoteStatus();
  const rankedCount = options.filter(opt => opt.rank).length;

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className={cn(
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            status.color
          )}>
            {status.icon}
            <span className="ml-1">{status.label}</span>
          </span>
          <span className="text-sm text-muted-foreground">
            {totalVotes} {t.voting.votes}
          </span>
        </div>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {options.map((option, index) => (
            <div
              key={option.id}
              className={cn(
                'p-4 rounded-lg border-2 transition-colors',
                option.rank ? 'border-primary bg-primary/5' : 'border-neutral-200',
                canVote && 'hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  {option.rank && (
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                      {option.rank}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {option.title}
                  </div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  )}
                </div>
                {canVote && (
                  <div className="flex items-center gap-2">
                    {option.rank && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveOption(index, 'up')}
                          disabled={index === 0 || !option.rank}
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => moveOption(index, 'down')}
                          disabled={index === options.length - 1 || !options[index + 1]?.rank}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      size="sm"
                      variant={option.rank ? 'outline' : 'secondary'}
                      onClick={() => toggleRank(index)}
                      disabled={!option.rank && maxRanked && rankedCount >= maxRanked}
                    >
                      {option.rank ? t.voting.actions.remove : t.voting.actions.rank}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {canVote && (
            <>
              <p className="text-sm text-muted-foreground text-center">
                {t.voting.ranked.rankedCount
                  .replace('{current}', rankedCount.toString())
                  .replace('{min}', minRanked.toString())
                  .replace('{max}', maxRanked ? maxRanked.toString() : '∞')}
              </p>
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleVote}
                  disabled={rankedCount < minRanked || isVoting}
                  loading={isVoting}
                >
                  {t.voting.actions.vote}
                </Button>
              </div>
            </>
          )}

          {!hasStarted && (
            <p className="text-sm text-muted-foreground text-center">
              {t.voting.messages.startsAt}{' '}
              {startTime.toLocaleString()}
            </p>
          )}

          {hasEnded && (
            <p className="text-sm text-muted-foreground text-center">
              {t.voting.messages.endedAt}{' '}
              {endTime.toLocaleString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
