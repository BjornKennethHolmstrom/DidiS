// types/voting.ts

export type VoteType = 'yes_no' | 'ranked_choice' | 'multiple_choice' | 'approval' | 'weighted';

// Vote type configurations and rules
export const VOTE_TYPE_CONFIG = {
  yes_no: {
    name: 'Ja/Nej-omröstning',
    description: 'En enkel omröstning med ja eller nej som alternativ',
    options: {
      min: 2,
      max: 2,
      fixed: true, // Cannot add/remove options
      defaultOptions: ['Ja', 'Nej']
    },
    rules: {
      selectMin: 1,
      selectMax: 1,
      allowAbstain: true,
      requireMajority: 0.5 // 50% majority
    },
    resultCalculation: 'simple_majority'
  },

  ranked_choice: {
    name: 'Rangordnad omröstning',
    description: 'Rangordna alternativ efter preferens',
    options: {
      min: 2,
      max: 10,
      fixed: false,
      allowCustom: false
    },
    rules: {
      requireFullRanking: false, // Can rank only some options
      allowTies: false, // Cannot give same rank to multiple options
      minimumRanked: 1
    },
    resultCalculation: 'instant_runoff'
  },

  multiple_choice: {
    name: 'Flerval',
    description: 'Välj ett alternativ bland flera möjliga',
    options: {
      min: 2,
      max: 20,
      fixed: false,
      allowCustom: false
    },
    rules: {
      selectMin: 1,
      selectMax: 1,
      allowAbstain: true,
      requireMajority: 0.5
    },
    resultCalculation: 'plurality'
  },

  approval: {
    name: 'Godkännandeomröstning',
    description: 'Godkänn valfritt antal alternativ',
    options: {
      min: 2,
      max: 20,
      fixed: false,
      allowCustom: false
    },
    rules: {
      selectMin: 0,
      selectMax: null, // No upper limit
      allowAbstain: true,
      requireApproval: 0.5 // 50% approval needed
    },
    resultCalculation: 'approval_counting'
  },

  weighted: {
    name: 'Viktad omröstning',
    description: 'Fördela poäng mellan olika alternativ',
    options: {
      min: 2,
      max: 10,
      fixed: false,
      allowCustom: false
    },
    rules: {
      totalPoints: 100, // Total points to distribute
      minPointsPerOption: 0,
      maxPointsPerOption: 100,
      requireAllPoints: true, // Must use all points
    },
    resultCalculation: 'weighted_sum'
  }
} as const;

// Result calculation methods
export type ResultCalculationMethod = 
  | 'simple_majority'
  | 'instant_runoff'
  | 'plurality'
  | 'approval_counting'
  | 'weighted_sum';

// Vote result formats
export interface VoteResults {
  type: VoteType;
  totalVotes: number;
  quorum: {
    required: number;
    reached: boolean;
  };
  options: {
    id: string;
    title: string;
    // For different voting types:
    votes?: number;         // yes_no, multiple_choice
    approvals?: number;     // approval
    points?: number;        // weighted
    rankings?: number[];    // ranked_choice
    percentage: number;
  }[];
  outcome: {
    passed: boolean;
    winner?: string;        // ID of winning option
    eliminated?: string[];  // For ranked choice
    rounds?: any[];        // For ranked choice rounds
  };
}

// Validation types
export interface VoteValidationRules {
  type: VoteType;
  options: typeof VOTE_TYPE_CONFIG[VoteType]['options'];
  rules: typeof VOTE_TYPE_CONFIG[VoteType]['rules'];
}

// Vote creation parameters
export interface CreateVoteParams {
  type: VoteType;
  title: string;
  description?: string;
  options: {
    title: string;
    description?: string;
  }[];
  settings: {
    startTime: Date;
    endTime: Date;
    quorumRequired?: number;
    majorityRequired?: number;
    allowAbstain?: boolean;
  };
}
