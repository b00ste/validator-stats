import {
  NetworkData,
  PublicKey,
  TokenPrice,
  ValidatorMap,
  ValidatorsBalances,
  ValidatorsData,
  ValidatorsLuck,
  ValidatorsMaps,
  ValidatorsPerformance,
} from "./UsedDataTypes";

// ------------ MAIN COMPONENTS PARAM TYPES ------------

export type LandingPageParams = {
  pageChangeHandler: Function;
};

export type ValidatorStatsPageParams = {
  mountValidatorStatsPage: boolean;
  bodyClasses: string;
  stakedLYX: number;
  tokenPrice: TokenPrice;
  validatorsData: ValidatorsData;
  withdrawalAddressesBalance: number;
};

export type UserPageParams = {
  mountUserPage: boolean;
  bodyClasses: string;
  publicKeys: PublicKey[];
  setPublicKeys: React.Dispatch<React.SetStateAction<PublicKey[]>>;
  validators: Record<string, string[]>;
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
};

export type ValidatorsPageParams = {
  mountValidatorsPage: boolean;
  bodyClasses: string;
  publicKeys: PublicKey[];
  validators: Record<string, string[]>;
  validatorsMaps: ValidatorsMaps;
  validatorsPerformance: ValidatorsPerformance;
};

export type HeaderParams = {
  networkData: NetworkData;
  tokenPrice: TokenPrice;
  isDropdownOpen: boolean;
  toggleDropdown: Function;
  pageChangeHandler: Function;
  refreshHandler: Function;
};

export type FooterParams = {};

// ------------ VALIDATOR STATS COMPONENTS PARAM TYPES ------------

export type TimeframePercentageRateParams = {
  timeframe: "daily" | "weekly" | "monthly" | "annual";
  tileClasses: string;
  stakedLYX: number;
};

export type BalanceParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  validatorsBalances: ValidatorsBalances;
};

export type EarningsParams = {
  timeframe: "daily" | "weekly" | "monthly" | "annual" | "total";
  tileClasses: string;
  tokenPrice: TokenPrice;
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
  tokenPrice: TokenPrice;
};

export type PerformanceParams = {
  tileClasses: string;
  validatorsPerformance: ValidatorsPerformance;
};

export type ValidatorsParams = {
  tileClasses: string;
  validatorsMaps: ValidatorsMaps;
};

export type WithdrawalBalanceParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  withdrawalAddressesBalance: number;
};

export type WithdrawalsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  tokenPrice: TokenPrice;
};

export type WithdrawableAmountParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  activeValidators: ValidatorMap;
  activeBalance: number;
};

// ------------ UTILS COMPONENTS PARAM TYPES ------------

export type DisplayTokenPriceParams = {
  tokenPrice: TokenPrice;
  tokenAmount: number;
};
