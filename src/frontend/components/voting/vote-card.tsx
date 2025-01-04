import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

interface VoteOption {
  id: string;
  title: string;
  description?: string;
}

interface VoteCardProps {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  options: VoteOption[];
  totalVotes?: number;
  onVote?: (optionId: string) => void;
  userVote?: string; // ID of the option user has voted for
  className?: string;
}

export default function VoteCard({
  id,
  title,
  description,
  startTime,
  endTime,
  options,
  totalVotes = 0,
  onVote,
  userVote,
  className
}: VoteCardProps) {
  const t = useTranslations();
  const [selectedOption, setSelectedOption] = useState<string | null>(userVote || null);
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

  const handleVote = async () => {
    if (!selectedOption || !onVote) return;
    
    setIsVoting(true);
    try {
      await onVote(selectedOption);
    } finally {
      setIsVoting(false);
    }
  };

  const status = getVoteStatus();

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
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => canVote && setSelectedOption(option.id)}
              disabled={!canVote}
              className={cn(
                'w-full p-4 rounded-lg border-2 transition-colors',
                canVote && 'hover:border-primary/50',
                selectedOption === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200',
                option.id === userVote && 'border-green-500 bg-green-50',
                !canVote && 'cursor-default'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  selectedOption === option.id
                    ? 'border-primary'
                    : 'border-neutral-300',
                  option.id === userVote && 'border-green-500'
                )}>
                  {(selectedOption === option.id || option.id === userVote) && (
                    <div className={cn(
                      'w-3 h-3 rounded-full',
                      selectedOption === option.id ? 'bg-primary' : 'bg-green-500'
                    )} />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">
                    {option.title}
                  </div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  )}
                </div>
                {option.id === userVote && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
            </button>
          ))}
          
          {canVote && (
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleVote}
                disabled={!selectedOption || isVoting}
                loading={isVoting}
              >
                {t.voting.actions.vote}
              </Button>
            </div>
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
