import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, Info, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

interface VoteOption {
  id: string;
  title: string;
  description?: string;
}

interface ApprovalVoteCardProps {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  options: VoteOption[];
  minApprovals?: number;
  requireResponse?: boolean;
  totalVotes?: number;
  onVote?: (approvedOptionIds: string[]) => void;
  userVote?: string[]; // Array of approved option IDs
  className?: string;
}

export default function ApprovalVoteCard({
  id,
  title,
  description,
  startTime,
  endTime,
  options,
  minApprovals = 0,
  requireResponse = true,
  totalVotes = 0,
  onVote,
  userVote,
  className
}: ApprovalVoteCardProps) {
  const t = useTranslations();
  const [approvedOptions, setApprovedOptions] = useState<Set<string>>(
    new Set(userVote || [])
  );
  const [isVoting, setIsVoting] = useState(false);
  const [hasResponded, setHasResponded] = useState(false);

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
    
    setHasResponded(true);
    const newApproved = new Set(approvedOptions);
    
    if (newApproved.has(optionId)) {
      newApproved.delete(optionId);
    } else {
      newApproved.add(optionId);
    }
    
    setApprovedOptions(newApproved);
  };

  const handleVote = async () => {
    if (!onVote || (!hasResponded && requireResponse)) return;
    
    if (approvedOptions.size < minApprovals) return;
    
    setIsVoting(true);
    try {
      await onVote(Array.from(approvedOptions));
    } finally {
      setIsVoting(false);
    }
  };

  const canSubmit = hasResponded && approvedOptions.size >= minApprovals;
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
                approvedOptions.has(option.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-neutral-200',
                userVote?.includes(option.id) && 'border-green-500 bg-green-50',
                !canVote && 'cursor-default'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center',
                  approvedOptions.has(option.id)
                    ? 'border-primary bg-primary text-white'
                    : 'border-neutral-300',
                  userVote?.includes(option.id) && 'border-green-500 bg-green-500'
                )}>
                  {(approvedOptions.has(option.id) || userVote?.includes(option.id)) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <X className="h-5 w-5 text-neutral-300" />
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
          
          {canVote && (
            <>
              {minApprovals > 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  {t.voting.approval.minApprovalsRequired
                    .replace('{current}', approvedOptions.size.toString())
                    .replace('{min}', minApprovals.toString())}
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
