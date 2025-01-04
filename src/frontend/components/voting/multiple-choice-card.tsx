import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

interface VoteOption {
  id: string;
  title: string;
  description?: string;
}

interface MultipleChoiceCardProps {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  options: VoteOption[];
  minChoices?: number;
  maxChoices?: number;
  allowAbstain?: boolean;
  totalVotes?: number;
  onVote?: (optionIds: string[]) => void;
  userVote?: string[]; // Array of selected option IDs
  className?: string;
}

export default function MultipleChoiceCard({
  id,
  title,
  description,
  startTime,
  endTime,
  options,
  minChoices = 1,
  maxChoices = 1,
  allowAbstain = true,
  totalVotes = 0,
  onVote,
  userVote,
  className
}: MultipleChoiceCardProps) {
  const t = useTranslations();
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    new Set(userVote || [])
  );
  const [isVoting, setIsVoting] = useState(false);
  const [hasAbstained, setHasAbstained] = useState(false);

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

  const toggleOption = (optionId: string) => {
    if (!canVote) return;
    
    setHasAbstained(false);
    const newSelected = new Set(selectedOptions);
    
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      if (newSelected.size >= maxChoices) {
        if (maxChoices === 1) {
          newSelected.clear();
        } else {
          return;
        }
      }
      newSelected.add(optionId);
    }
    
    setSelectedOptions(newSelected);
  };

  const handleAbstain = () => {
    if (!canVote || !allowAbstain) return;
    setHasAbstained(true);
    setSelectedOptions(new Set());
  };

  const handleVote = async () => {
    if (!onVote || (!selectedOptions.size && !hasAbstained)) return;
    
    if (selectedOptions.size < minChoices && !hasAbstained) return;
    
    setIsVoting(true);
    try {
      await onVote(Array.from(selectedOptions));
    } finally {
      setIsVoting(false);
    }
  };

  const canSubmit = (selectedOptions.size >= minChoices && 
                    selectedOptions.size <= maxChoices) || 
                    (hasAbstained && allowAbstain);

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
              onClick={() => toggleOption(option.id)}
              disabled={!canVote}
              className={cn(
                'w-full p-4 rounded-lg border-2 transition-colors text-left',
                canVote && 'hover:border-primary/50',
                selectedOptions.has(option.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200',
                userVote?.includes(option.id) && 'border-green-500 bg-green-50',
                !canVote && 'cursor-default',
                hasAbstained && 'opacity-50'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center',
                  selectedOptions.has(option.id)
                    ? 'border-primary'
                    : 'border-neutral-300',
                  userVote?.includes(option.id) && 'border-green-500',
                  maxChoices === 1 ? 'rounded-full' : 'rounded'
                )}>
                  {(selectedOptions.has(option.id) || userVote?.includes(option.id)) && (
                    <div className={cn(
                      'w-3 h-3',
                      maxChoices === 1 ? 'rounded-full' : 'rounded',
                      selectedOptions.has(option.id) ? 'bg-primary' : 'bg-green-500'
                    )} />
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
              </div>
            </button>
          ))}
          
          {allowAbstain && canVote && (
            <button
              onClick={handleAbstain}
              className={cn(
                'w-full p-4 rounded-lg border-2 transition-colors text-left',
                'hover:border-primary/50',
                hasAbstained
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  hasAbstained
                    ? 'border-primary'
                    : 'border-neutral-300'
                )}>
                  {hasAbstained && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
                <div className="font-medium">
                  {t.voting.actions.abstain}
                </div>
              </div>
            </button>
          )}

          {canVote && (
            <>
              {!hasAbstained && (
                <p className="text-sm text-muted-foreground text-center">
                  {t.voting.multipleChoice.selectionCount
                    .replace('{current}', selectedOptions.size.toString())
                    .replace('{min}', minChoices.toString())
                    .replace('{max}', maxChoices.toString())}
                </p>
              )}
              
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleVote}
                  disabled={!canSubmit || isVoting}
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
