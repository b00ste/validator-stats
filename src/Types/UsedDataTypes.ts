import {
  Validator,
  ConsensusPerformance,
  ExecutionPerformance,
} from './FetchedDataTypes';

export type WithdrawalAddress = {
  address: string;
  name: string;
};

export type WithdrawalAddressesGroup = {
  name: string;
  key: string;
  withdrawalAddresses: WithdrawalAddress[];
};

export type ValidatorMap = Record<string, Validator>;

export type ValidatorsLuck = {
  average_proposal_interval: number;
  next_proposal_estimate_ts: number;
  proposal_luck: number;
  time_frame_name: string;
  sampleSize: number;
};

export type AttestationPerformance = {
  executedAttestations: number;
  missedAttestations: number;
  attestationCount: number;
};

export type ValidatorsMaps = {
  activeValidators: Record<string, ValidatorMap>;
  pendingValidators: Record<string, ValidatorMap>;
  offlineValidators: Record<string, ValidatorMap>;
  slashedValidators: Record<string, ValidatorMap>;
  otherValidators: Record<string, ValidatorMap>;
};

export type ValidatorsData = {
  activeValidators?: Record<string, ValidatorMap>;
  pendingValidators?: Record<string, ValidatorMap>;
  offlineValidators?: Record<string, ValidatorMap>;
  slashedValidators?: Record<string, ValidatorMap>;
  otherValidators?: Record<string, ValidatorMap>;
  validatorsLuck?: Record<string, ValidatorsLuck>;
  validatorsPerformance?: Record<string, ValidatorsPerformance>;
};

export type ValidatorsBalances = {
  activeBalance: number;
  pendingBalance: number;
  offlineBalance: number;
  slashedBalance: number;
  otherBalance: number;
};

export type ValidatorsCount = {
  activeValidatorsCount: number;
  pendingValidatorsCount: number;
  offlineValidatorsCount: number;
  slashedValidatorsCount: number;
  otherValidatorsCount: number;
};

export type ValidatorsPerformance = Record<
  number,
  {
    attestationPerformance: AttestationPerformance;
    consensusPerformance: ConsensusPerformance;
    executionPerformance: ExecutionPerformance;
  }
>;

export type NetworkData = {
  stakedLYX?: number;
  currentEpoch?: number;
  networkValidators?: number;
};

export type LYXPrice = {
  eur?: number;
  usd?: number;
};
