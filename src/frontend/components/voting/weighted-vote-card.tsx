import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, Info, CheckCircle2, MoveHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/hooks/useTranslations';

interface VoteOption {
  id: string;
  title: string;
  description?: string;
}

interface WeightedVoteCardProps {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  options: VoteOption[];
  totalPoints: number;
  minPointsPerOption?: number;
  maxPointsPerOption?: number;
  allowAbstain?: boolean;
  totalVotes?: number;
  onVote?: (weightedVotes: { [key: string]: number }) => void;
  userVote?: { [key: string]: number }; // Map of option ID to points
  className?: string;
}

export default function WeightedVoteCard({
  id,
  title,
  description,
  startTime,
  endTime,
  options,
  totalPoints,
  minPointsPerOption = 0,
  maxPointsPerOption = 100,
  allowAbstain = true,
  totalVotes = 0,
  onVote,
  userVote,
  className
}: WeightedVoteCardProps) {
  const t = useTranslations();
  const [points, setPoints] = useState<{ [key: string]: number }>(() => {
    if (userVote) return userVote;
    return options.reduce((acc, opt) => ({ ...acc, [opt.id]: 0 }), {});
  });
  const [hasAbstained, setHasAbstained] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handlePointChange = (optionId: string, value: string) => {
    if (!canVote || hasAbstained) return;
    
    const numValue = Math.min(
      Math.max(0, parseInt(value) || 0),
      maxPointsPerOption
    );
    
    setPoints(prev => ({ ...prev, [optionId]: numValue }));
    setError(null);
  };

  const getTotalPointsUsed = () => {
    return Object.values(points).reduce((sum, p) => sum + p, 0);
  };

  const handleAbstain = () => {
    if (!canVote || !allowAbstain) return;
    setHasAbstained(true);
    setPoints(options.reduce((acc, opt) => ({ ...acc, [opt.id]: 0 }), {}));
    setError(null);
  };

  const validateVote = (): boolean => {
    if (hasAbstained) return true;

    const totalUsed = getTotalPointsUsed();
    if (totalUsed !== totalPoints) {
      setError(t.voting.weighted.errors.totalPoints
        .replace('{used}', totalUsed.toString())
        .replace('{total}', totalPoints.toString())
      );
      return false;
    }

    const invalidOptions = options.filter(opt => 
      points[opt.id] < minPointsPerOption || 
      points[opt.id] > maxPointsPerOption
    );

    if (invalidOptions.length > 0) {
      setError(t.voting.weighted.errors.pointRange
        .replace('{min}', minPointsPerOption.toString())
        .replace('{max}', maxPointsPerOption.toString())
      );
      return false;
    }

    return true;
  };

  const handleVote = async () => {
    if (!onVote || (!hasAbstained && !validateVote())) return;
    
    setIsVoting(true);
    try {
      await onVote(points);
    } finally {
      setIsVoting(false);
    }
  };

  const status = getVoteStatus();
  const remainingPoints = totalPoints - getTotalPointsUsed();

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
          {/* Points Remaining Display */}
          {canVote && !hasAbstained && (
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">
                {t.voting.weighted.remainingPoints}
              </span>
              <span className={cn(
                'font-bold',
                remainingPoints < 0 ? 'text-red-500' : 'text-blue-600'
              )}>
                {remainingPoints}
              </span>
            </div>
          )}

          {/* Options */}
          {options.map((option) => (
            <div
              key={option.id}
              className={cn(
                'p-4 rounded-lg border-2 transition-colors',
                canVote && !hasAbstained && 'hover:border-primary/50',
                points[option.id] > 0 ? 'border-primary bg-primary/5' : 'border-neutral-200',
                !canVote && 'cursor-default',
                hasAbstained && 'opacity-50'
              )}
            >
              <div className="flex items-center gap-4">
                {/* Point Input */}
                <div className="w-24">
                  <Input
                    type="number"
                    min={0}
                    max={maxPointsPerOption}
                    value={points[option.id]}
                    onChange={(e) => handlePointChange(option.id, e.target.value)}
                    disabled={!canVote || hasAbstained}
                    className="text-center"
                  />
                </div>

                {/* Quick Add/Remove Buttons */}
                {canVote && !hasAbstained && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePointChange(
                        option.id, 
                        (points[option.id] - 10).toString()
                      )}
                      disabled={points[option.id] < 10}
                    >
                      -10
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePointChange(
                        option.id, 
                        (points[option.id] + 10).toString()
                      )}
                      disabled={points[option.id] + 10 > maxPointsPerOption}
                    >
                      +10
                    </Button>
                  </div>
                )}

                {/* Option Info */}
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

                {/* Points Bar */}
                <div className="w-32">
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${(points[option.id] / maxPointsPerOption) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
          
          {/* Abstain Option */}
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
                <MoveHorizontal className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">
                  {t.voting.actions.abstain}
                </span>
              </div>
            </button>
          )}

          {/* Submit Button */}
          {canVote && (
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleVote}
                disabled={!hasAbstained && !validateVote() || isVoting}
                loading={isVoting}
              >
                {t.voting.actions.vote}
              </Button>
            </div>
          )}

          {/* Status Messages */}
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
