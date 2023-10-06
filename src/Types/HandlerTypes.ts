import {
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
  WithdrawalAddress,
} from './UsedDataTypes';

export type UpdateValidator = (
  withdrawalAddresses: WithdrawalAddress[],
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
) => void;

export type UpdateWithdrawalAddressesBalances = (
  withdrawalAddresses: WithdrawalAddress[],
  setWithdrawalAddressessBalances: React.Dispatch<
    React.SetStateAction<Record<string, number> | undefined>
  >,
) => void;

export type UpdateValidatorsMaps = (
  validators: Record<string, string[]>,
  setActiveValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setPendingValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setOfflineValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setSlashedValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setOtherValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
) => void;

export type UpdateVaildatorsLuck = (
  activeValidators: Record<string, ValidatorMap>,
  setValidatorsLuck: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorsLuck> | undefined>
  >,
) => void;

export type UpdateVaildatorsPerformance = (
  activeValidators: Record<string, ValidatorMap>,
  setValidatorsPerformance: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorsPerformance> | undefined>
  >,
) => void;

export type UpdateNetworkData = (
  setStakedLYX: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentEpoch: React.Dispatch<React.SetStateAction<number | undefined>>,
  setNetworkValidators: React.Dispatch<
    React.SetStateAction<number | undefined>
  >,
) => void;

export type UpdateLYXPrice = (
  setEurPrce: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUsdPrce: React.Dispatch<React.SetStateAction<string | undefined>>,
) => void;

export type Refresh = (
  // Hanglers
  updateValidator: UpdateValidator,
  updateWithdrawalAddressesBalances: UpdateWithdrawalAddressesBalances,
  updateValidatorsMaps: UpdateValidatorsMaps,
  updateVaildatorsLuck: UpdateVaildatorsLuck,
  updateVaildatorsPerformance: UpdateVaildatorsPerformance,
  updateNetworkData: UpdateNetworkData,
  updateLYXPrice: UpdateLYXPrice,
  // Data
  withdrawalAddresses: WithdrawalAddress[],
  validators: Record<string, string[]>,
  activeValidators: Record<string, ValidatorMap> | undefined,
  // Setters
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
  setWithdrawalAddressessBalances: React.Dispatch<
    React.SetStateAction<Record<string, number> | undefined>
  >,
  setActiveValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setPendingValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setOfflineValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setSlashedValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setOtherValidators: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorMap> | undefined>
  >,
  setValidatorsLuck: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorsLuck> | undefined>
  >,
  setValidatorsPerformance: React.Dispatch<
    React.SetStateAction<Record<string, ValidatorsPerformance> | undefined>
  >,
  setStakedLYX: React.Dispatch<React.SetStateAction<number | undefined>>,
  setCurrentEpoch: React.Dispatch<React.SetStateAction<number | undefined>>,
  setNetworkValidators: React.Dispatch<
    React.SetStateAction<number | undefined>
  >,
  setEurPrce: React.Dispatch<React.SetStateAction<string | undefined>>,
  setUsdPrce: React.Dispatch<React.SetStateAction<string | undefined>>,
) => void;
