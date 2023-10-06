import {
  NetworkData,
  WithdrawalAddress,
  TokenPrice,
  ValidatorMap,
  ValidatorsBalances,
  ValidatorsData,
  ValidatorsLuck,
  ValidatorsMaps,
  ValidatorsPerformance,
  WithdrawalAddressesGroup,
  ValidatorsCount,
} from './UsedDataTypes';

// ------------ MAIN COMPONENTS PARAM TYPES ------------

export type LandingPageParams = {
  bodyClasses: string;
  tileClasses: string;
  buttonClasses: string;
  handlePageNavigation: Function;
};

export type ValidatorStatsPageParams = {
  bodyClasses: string;
  tileClasses: string;
  buttonClasses: string;
  stakedLYX: number;
  tokenPrice: TokenPrice;
  validatorsData: ValidatorsData;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  withdrawalAddressesBalance: Record<string, number>;
};

export type UserPageParams = {
  bodyClasses: string;
  tileClasses: string;
  buttonClasses: string;
  withdrawalAddresses: WithdrawalAddress[];
  setWithdrawalAddresses: React.Dispatch<
    React.SetStateAction<WithdrawalAddress[]>
  >;
  validators: Record<string, string[]>;
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  defaultPage: string;
  setDefaultPage: React.Dispatch<React.SetStateAction<string>>;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  setWithdrawalAddressessGroups: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup[]>
  >;
};

export type ValidatorsPageParams = {
  bodyClasses: string;
  tileClasses: string;
  withdrawalAddresses: WithdrawalAddress[];
  validatorsMaps: ValidatorsMaps;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type BodyParams = {
  bodyClasses: string;
  tileClasses: string;
  buttonClasses: string;
  defaultPage: string;
  setDefaultPage: React.Dispatch<React.SetStateAction<string>>;
  handlePageNavigation: Function;
  withdrawalAddresses: WithdrawalAddress[];
  setWithdrawalAddresses: React.Dispatch<
    React.SetStateAction<WithdrawalAddress[]>
  >;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  setWithdrawalAddressessGroups: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup[]>
  >;
  withdrawalAddressesBalances: Record<string, number> | undefined;
  validators: Record<string, string[]>;
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  validatorsData: ValidatorsData;
  networkData: NetworkData;
  tokenPrice: TokenPrice;
};

export type HeaderParams = {
  buttonClasses: string;
  networkData: NetworkData;
  tokenPrice: TokenPrice;
  isDropdownOpen: boolean;
  handlePageNavigation: Function;
  refreshHandler: Function;
  toggleDropdown: Function;
};

export type FooterParams = {
  handlePageNavigation: Function;
};

// ------------ VALIDATOR STATS COMPONENTS PARAM TYPES ------------

export type TimeframePercentageRateParams = {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual';
  tileClasses: string;
  stakedLYX: number;
};

export type BalanceParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  validatorsBalances: ValidatorsBalances;
};

export type EarningsParams = {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual' | 'total';
  tileClasses: string;
  tokenPrice: TokenPrice;
  stakedLYX: number;
  activeBalance: number;
  selectedGroup: WithdrawalAddressesGroup;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type LuckParams = {
  tileClasses: string;
  selectedGroup: WithdrawalAddressesGroup;
  validatorsLuck: Record<string, ValidatorsLuck>;
};

export type LYXPriceParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
};

export type PerformanceParams = {
  tileClasses: string;
  selectedGroup: WithdrawalAddressesGroup;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type ValidatorsParams = {
  tileClasses: string;
  validatorsCount: ValidatorsCount;
};

export type WithdrawalBalanceParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  selectedGroup: WithdrawalAddressesGroup;
  withdrawalAddressesBalance: Record<string, number>;
};

export type WithdrawalsParams = {
  tileClasses: string;
  selectedGroup: WithdrawalAddressesGroup;
  activeValidators: Record<string, ValidatorMap>;
  tokenPrice: TokenPrice;
};

export type WithdrawableAmountParams = {
  tileClasses: string;
  tokenPrice: TokenPrice;
  validatorsCount: ValidatorsCount;
  validatorsBalances: ValidatorsBalances;
};

// ------------ UTILS COMPONENTS PARAM TYPES ------------

export type DisplayTokenPriceParams = {
  tokenPrice: TokenPrice;
  tokenAmount: number;
};
