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
  handlePageNavigation: Function;
};

export type ValidatorStatsPageParams = {
  stakedLYX: number;
  tokenPrice: TokenPrice;
  validatorsData: ValidatorsData;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  withdrawalAddressesBalance: Record<string, number>;
};

export type UserPageParams = {
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
  withdrawalAddresses: WithdrawalAddress[];
  validatorsMaps: ValidatorsMaps;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type BodyParams = {
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

  stakedLYX: number;
  activeBalance: number;
};

export type BalanceParams = {
  tokenPrice: TokenPrice;
  validatorsBalances: ValidatorsBalances;
};

export type EarningsParams = {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual' | 'total';

  tokenPrice: TokenPrice;
  stakedLYX: number;
  activeBalance: number;
  selectedGroup: WithdrawalAddressesGroup;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type LuckParams = {
  selectedGroup: WithdrawalAddressesGroup;
  validatorsLuck: Record<string, ValidatorsLuck>;
};

export type LYXPriceParams = {
  tokenPrice: TokenPrice;
};

export type PerformanceParams = {
  selectedGroup: WithdrawalAddressesGroup;
  validatorsPerformance: Record<string, ValidatorsPerformance>;
};

export type ValidatorsParams = {
  validatorsCount: ValidatorsCount;
};

export type WithdrawalBalanceParams = {
  tokenPrice: TokenPrice;
  selectedGroup: WithdrawalAddressesGroup;
  withdrawalAddressesBalance: Record<string, number>;
};

export type WithdrawalsParams = {
  selectedGroup: WithdrawalAddressesGroup;
  activeValidators: Record<string, ValidatorMap>;
  tokenPrice: TokenPrice;
};

export type WithdrawableAmountParams = {
  tokenPrice: TokenPrice;
  validatorsCount: ValidatorsCount;
  validatorsBalances: ValidatorsBalances;
};

// ------------ UTILS COMPONENTS PARAM TYPES ------------

export type DisplayTokenPriceParams = {
  tokenPrice: TokenPrice;
  tokenAmount: number;
};
