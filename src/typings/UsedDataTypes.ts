import {
  Validator,
  ConsensusPerformance,
  ExecutionPerformance,
} from "./FetchedDataTypes";

export type PublicKey = {
  address: string;
  name: string;
  type: "depositor" | "withdrawal";
};

export type ValidatorMap = Record<string, Validator>;

export type ValidatorsLuck = {
  average_proposal_interval: number;
  next_proposal_estimate_ts: number;
  proposal_luck: number;
  time_frame_name: string;
};

export type AttestationPerformance = {
  executedAttestations: number;
  missedAttestations: number;
  attestationCount: number;
};

export type ValidatorsMaps = {
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  offlineValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
};

export type ValidatorsData = {
  validatorsMaps: ValidatorsMaps;
  validatorsLuck: ValidatorsLuck;
  validatorsPerformance: ValidatorsPerformance;
};

export type ValidatorsBalances = {
  activeBalance: number;
  pendingBalance: number;
  offlineBalance: number;
  slashedBalance: number;
  otherBalance: number;
};

export type ValidatorsPerformance = Record<
  number,
  {
    attestationPerformance: AttestationPerformance;
    consensusPerformance: ConsensusPerformance;
    executionPerformance: ExecutionPerformance;
  }
>;

export type TokenPrice = {
  eurPrice: string;
  usdPrice: string;
};

export type NetworkData = {
  stakedLYX: number;
  currentEpoch: number;
  networkValidators: number;
};
