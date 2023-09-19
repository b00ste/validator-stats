export type Epoch = {
  attestationscount: number;
  attesterslashingscount: number;
  averagevalidatorbalance: number;
  blockscount: number;
  depositscount: number;
  eligibleether: number;
  epoch: number;
  finalized: boolean;
  globalparticipationrate: number;
  missedblocks: number;
  orphanedblocks: number;
  proposedblocks: number;
  proposerslashingscount: number;
  rewards_exported: boolean;
  scheduledblocks: number;
  totalvalidatorbalance: number;
  ts: string;
  validatorscount: number;
  voluntaryexitscount: number;
  votedether: number;
  withdrawalcount: number;
};

export type Validator = {
  activationeligibilityepoch: number;
  activationepoch: number;
  balance: number;
  effectivebalance: number;
  exitepoch: number;
  lastattestationslot: number;
  name: string;
  pubkey: string;
  slashed: boolean;
  status: string;
  total_withdrawals: number;
  validatorindex: number;
  withdrawableepoch: number;
  withdrawalcredentials: string;
};

export type ValidatorsWithdrawals = {
  address: string;
  amount: number;
  blockroot: string;
  epoch: number;
  slot: number;
  validatorindex: number;
  withdrawalindex: number;
};

export type Attestation = {
  attesterslot: number;
  committeeindex: number;
  epoch: number;
  inclusionslot: number;
  status: number;
  validatorindex: number;
  week: number;
  week_end: string;
  week_start: string;
};

export type ConsensusPerformance = {
  balance: number;
  performance1d: number;
  performance7d: number;
  performance31d: number;
  performance365d: number;
  performancetoday: number;
  performancetotal: number;
  rank7d: number;
  validatorindex: number;
};

export type ExecutionPerformance = {
  performance1d: number;
  performance7d: number;
  performance31d: number;
  performance365d: number;
  performanceTotal: number;
  validatorindex: number;
};
