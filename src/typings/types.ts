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

export type ValidatorsMaps = {
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
};

export type ValidatorsData = {
  validatorsMaps: ValidatorsMaps;
  validatorsLuck: ValidatorsLuck;
  validatorsPerformance: ValidatorsPerformance;
};

// ------------ COMPONENTS PARAM TYPES ------------

export type StatsPageParams = {
  mountStatsPage: boolean;
  bodyClasses: string;
  stakedLYX: number;
  tokenPrice: {
    eurPrice: string;
    usdPrice: string;
  };
  validatorsData: ValidatorsData;
  withdrawalAddressesBalance: number;
};

export type UserPageParams = {
  mountUserPage: boolean;
  bodyClasses: string;
  publicKeys: PublicKey[];
  setPublicKeys: React.Dispatch<React.SetStateAction<PublicKey[]>>;
  setValidatorArray: React.Dispatch<React.SetStateAction<string[]>>;
};

export type ValidatorsPageParams = {
  mountValidatorsPage: boolean;
  bodyClasses: string;
  publicKeys: PublicKey[];
  validatorArray: string[];
  validatorsMaps: ValidatorsMaps;
};

export type HeaderParams = {
  stakedLYX: number;
  currentEpoch: number;
  networkValidators: number;
  tokenPrice: {
    eurPrice: string;
    usdPrice: string;
  };
  isDropdownOpen: boolean;
  toggleDropdown: Function;
  pageChangeHandler: Function;
};

export type FooterParams = {};

// ------------ STATS COMPONENTS PARAM TYPES ------------

export type APYRateParams = {
  timeframe: "daily" | "weekly" | "monthly" | "annual";
  tileClasses: string;
  stakedLYX: number;
};

export type BalanceParams = {
  tileClasses: string;
  activeBalance: number;
  pendingBalance: number;
  slashedBalance: number;
  otherBalance: number;
};

export type EarningsParams = {
  timeframe: "daily" | "weekly" | "monthly" | "annual" | "total";
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  stakedLYX: number;
  activeBalance: number;
  validatorsPerformance: ValidatorsPerformance;
};

export type LuckParams = {
  tileClasses: string;
  validatorsLuck: ValidatorsLuck;
};

export type LYXPriceParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
};

export type PerformanceParams = {
  tileClasses: string;
  validatorsPerformance: ValidatorsPerformance;
};

export type ValidatorsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
};

export type WithdrawalBalanceParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  withdrawalAddressesBalance: number;
};

export type WithdrawalsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  eurPrice: string;
  usdPrice: string;
};

export type WithdrawableAmountParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  activeValidators: ValidatorMap;
  activeBalance: number;
};
