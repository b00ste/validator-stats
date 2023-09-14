export type Validator = {
  balance: string;
  index: string;
  status: string;
  validator: {
    activation_eligibility_epoch: string;
    activation_epoch: string;
    effective_balance: string;
    exit_epoch: string;
    pubkey: string;
    slashed: boolean;
    withdrawable_epoch: string;
    withdrawal_credentials: string;
  };
};

export type ValidatorList = {
  data: Validator[];
  execution_optimistic: boolean;
  finalized: boolean;
};

export type PublicKey = {
  address: string;
  type: "depositoor" | "withdrawal_address";
};

export type ValidatorMap = Record<
  string,
  { balance: number; validatorindex: number; luck?: number }
>;

export type ValidatorsLuck = {
  average_proposal_interval: number;
  next_proposal_estimate_ts: number;
  proposal_luck: number;
  time_frame_name: string;
};

export type AttestationEfficiency = {
  attestation_efficiency: number;
  validatorindex: number;
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

export type ValidatorsPerformance = Record<
  number,
  {
    attestationEfficiency: AttestationEfficiency;
    consensusPerformance: ConsensusPerformance;
    executionPerformance: ExecutionPerformance;
  }
>;

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

export type ValidatorsWithdrawals = {
  address: string;
  amount: number;
  blockroot: string;
  epoch: number;
  slot: number;
  validatorindex: number;
  withdrawalindex: number;
};
