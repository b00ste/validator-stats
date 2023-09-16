export type PublicKey = {
  address: string;
  name: string;
  type: "depositor" | "withdrawal";
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

export type ValidatorMap = Record<string, Validator>;

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

// ------------ COMPONENTS PARAM TYPES ------------

export type StatsPageParams = {
  publicKeys: PublicKey[];
  stakedLYX: number;
  eurPrice: string;
  usdPrice: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
  validatorsLuck: ValidatorsLuck;
  validatorsPerformance: ValidatorsPerformance;
  validatorMapsNeedUpdate: boolean;
  networkDataNeedsUpdate: boolean;
  luckNeedsUpdate: boolean;
  performanceNeedsUpdate: boolean;
  LYXPriceNeedsUpdate: boolean;
  withdrawalAddressesBalanceNeedsUpdate: boolean;
  setWithdrawalAddressesBalanceNeedsUpdate: Function;
};

export type ValidatorsPageParams = {
  validatorArray: string[];
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
};

export type UserPageParams = {
  publicKeys: PublicKey[];
  setPublicKeys: Function;
};

export type HeaderParams = {
  setPage: Function;
  stakedLYX: number;
  currentEpoch: number;
  networkValidators: number;
  handleRefresh: Function;
};

export type FooterParams = { setPage: Function };

// ------------ STATS COMPONENTS PARAM TYPES ------------

export type APYRateParams = {
  timeframe: "monthly" | "annual";
  tileClasses: string;
  stakedLYX: number;
  networkDataNeedsUpdate: boolean;
};

export type BalanceParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
  validatorMapsNeedUpdate: boolean;
};

export type EarningsParams = {
  timeframe: "weekly" | "monthly" | "total";
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  validatorsPerformance: ValidatorsPerformance;
  LYXPriceNeedsUpdate: boolean;
  performanceNeedsUpdate: boolean;
};

export type LuckParams = {
  tileClasses: string;
  validatorsLuck: ValidatorsLuck;
  luckNeedsUpdate: boolean;
};

export type LYXPriceParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  LYXPriceNeedsUpdate: boolean;
};

export type PerformanceParams = {
  tileClasses: string;
  validatorsPerformance: ValidatorsPerformance;
  performanceNeedsUpdate: boolean;
};

export type ValidatorsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
  validatorMapsNeedUpdate: boolean;
};

export type WithdrawalBalanceParams = {
  tileClasses: string;
  publicKeys: PublicKey[];
  eurPrice: string;
  usdPrice: string;
  withdrawalAddressesBalanceNeedsUpdate: boolean;
  setWithdrawalAddressesBalanceNeedsUpdate: Function;
};

export type WithdrawalsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  eurPrice: string;
  usdPrice: string;
  validatorMapsNeedUpdate: boolean;
};
