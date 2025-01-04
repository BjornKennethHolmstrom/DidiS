export const en = {
  
  voting: {
    title: 'Vote',
    votes: 'votes',
    status: {
      notStarted: 'Not started',
      active: 'Active',
      ended: 'Ended',
      voted: 'Voted'
    },
    types: {
      yes_no: {
        name: 'Yes/No Vote',
        options: {
          yes: 'Yes',
          no: 'No'
        }
      }
    },
    ranked: {
      name: 'Ranked Choice Vote',
      rankedCount: '{current} of {min}-{max} options ranked',
      instructions: 'Rank the options by dragging them in your preferred order',
      minRequired: 'You must rank at least {min} options',
      maxAllowed: 'You can rank up to {max} options',
    },
    multipleChoice: {
      name: 'Multiple Choice',
      selectionCount: '{current} of {min}-{max} choices made',
      maxSelectionsReached: 'Maximum selections reached',
      minSelectionsRequired: 'You must select at least {min}',
      yourSelection: 'Your selection',
      yourSelections: 'Your selections',
      instructions: 'Voting Instructions',
      minSelectionsRequired: 'You must select at least {min} option(s)',
      maxSelectionsInfo: 'You can select up to {max} options',
      abstainOption: 'You can choose to abstain from voting',
    },
    approval: {
      name: 'Approval Vote',
      description: 'Approve all options you support',
      minApprovalsRequired: '{current} of minimum {min} approvals',
      noMinimum: 'No minimum approvals required',
      approve: 'Approve',
      disapprove: 'Disapprove',
      approved: 'Approved',
      disapproved: 'Disapproved',
      instructions: 'Mark all options you support',
      yourApprovals: 'Your approvals'
    },
    weighted: {
      name: 'Weighted Vote',
      description: 'Distribute points among options',
      remainingPoints: 'Remaining Points',
      pointValue: 'Points',
      addPoints: 'Add points',
      removePoints: 'Remove points',
      errors: {
        totalPoints: 'You must use exactly {total} points (used: {used})',
        pointRange: 'Each option must have between {min} and {max} points',
        invalidNumber: 'Invalid number of points'
      },
      instructions: {
        title: 'How to Vote',
        distribute: 'Distribute a total of {total} points among the options',
        limits: 'Each option can receive between {min} and {max} points',
        remaining: 'Shows remaining points to distribute',
        abstain: 'You can choose to abstain from voting'
      },
      yourDistribution: 'Your Point Distribution',
      points: 'points',
    },
    actions: {
      vote: 'Vote',
      changeVote: 'Change vote',
      abstain: 'Abstain',
      rank: 'Rank',
      remove: 'Remove',
      moveUp: 'Move up',
      moveDown: 'Move down',
    },
    messages: {
      startsAt: 'Voting starts at',
      endedAt: 'Voting ended at',
      confirmVote: 'Are you sure about your vote?',
      voteSuccess: 'Your vote has been recorded',
      voteError: 'Failed to record your vote',
      loginRequired: 'You must be logged in to vote'
    }
  }
};
