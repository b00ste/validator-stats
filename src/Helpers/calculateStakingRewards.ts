export interface CalculateStakingRewardsParams {
  slotTimeInSec?: number;
  slotsInEpoch?: number;
  baseRewardFactor?: number;
  totalAtStake?: number; // LYX
  averageNetworkPctOnline?: number;
  vaildatorUptime?: number;
  validatorDeposit?: number; // LYX
  effectiveBalanceIncrement?: number; // gwei
  weightDenominator?: number;
  proposerWeight?: number;
}

export const calculateStakingRewards = ({
  slotTimeInSec = 12,
  slotsInEpoch = 32,
  baseRewardFactor = 64,
  totalAtStake = 1_000_000, // LYX
  averageNetworkPctOnline = 0.95,
  vaildatorUptime = 0.99,
  validatorDeposit = 32, // LYX
  effectiveBalanceIncrement = 1_000_000_000, // gwei
  weightDenominator = 64,
  proposerWeight = 8,
}: CalculateStakingRewardsParams): number => {
  // Calculate number of epochs per year
  const avgSecInYear = 31556908.8; // 60 * 60 * 24 * 365.242
  const epochPerYear = avgSecInYear / (slotTimeInSec * slotsInEpoch);
  const baseRewardPerIncrement =
    (effectiveBalanceIncrement * baseRewardFactor) /
    (totalAtStake * 10e8) ** 0.5;

  // Calculate base reward for full validator (in gwei)
  const baseGweiRewardFullValidator =
    ((validatorDeposit * 10e8) / effectiveBalanceIncrement) *
    baseRewardPerIncrement;

  // Calculate offline per-validator penalty per epoch (in gwei)
  // Note: Inactivity penalty is not included in this simple calculation
  const offlineEpochGweiPentalty =
    baseGweiRewardFullValidator *
    ((weightDenominator - proposerWeight) / weightDenominator);

  // Calculate online per-validator reward per epoch (in gwei)
  const onlineEpochGweiReward =
    baseGweiRewardFullValidator * averageNetworkPctOnline;

  // Calculate net yearly staking reward (in gwei)
  const reward = onlineEpochGweiReward * vaildatorUptime;
  const penalty = offlineEpochGweiPentalty * (1 - vaildatorUptime);
  const netRewardPerYear = epochPerYear * (reward - penalty);

  // Return net yearly staking reward percentage
  return netRewardPerYear / 10e8 / validatorDeposit;
};

export type GetTimeframePercentageYieldParams = {
  totalAtStake: number;
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual';
};

export const getTimeframePercentageYieldUnformated = ({
  totalAtStake,
  timeframe,
}: GetTimeframePercentageYieldParams) => {
  const currentAPR = calculateStakingRewards({
    totalAtStake,
  });
  const formattedAPR = Math.round(currentAPR * 1000) / 10;

  switch (timeframe) {
    case 'daily': {
      return formattedAPR / 365;
    }
    case 'weekly': {
      return (formattedAPR / 365) * 7;
    }
    case 'monthly': {
      return formattedAPR / 12;
    }
    case 'annual': {
      return formattedAPR;
    }
  }
};

export const getTimeframePercentageYield = ({
  totalAtStake,
  timeframe,
}: GetTimeframePercentageYieldParams) => {
  const currentAPR = calculateStakingRewards({
    totalAtStake,
  });
  const formattedAPR = Math.round(currentAPR * 1000) / 10;

  switch (timeframe) {
    case 'daily': {
      return formattedAPR / 365;
    }
    case 'weekly': {
      return (formattedAPR / 365) * 7;
    }
    case 'monthly': {
      return formattedAPR / 12;
    }
    case 'annual': {
      return formattedAPR;
    }
  }
};
