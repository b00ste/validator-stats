// helpers
import { getTimeframePercentageYieldUnformated } from '../../Helpers/calculateStakingRewards';

// ts types
import { EarningsParams } from '../../Types/ComponentParamsTypes';
import { DisplayTokenPrice } from '../DisplayTokenPrice';

export const Earnings = ({
  timeframe,
  tileClasses,
  tokenPrice,
  stakedLYX,
  activeBalance,
  selectedGroup,
  validatorsPerformance,
}: EarningsParams) => {
  const getTimeframeParamNames = (): {
    consensusTimeframeParam:
      | 'performance1d'
      | 'performance7d'
      | 'performance31d'
      | 'performance365d'
      | 'performancetotal';
    executionTimeframeParam:
      | 'performance1d'
      | 'performance7d'
      | 'performance31d'
      | 'performance365d'
      | 'performanceTotal';
  } => {
    switch (timeframe) {
      case 'daily': {
        return {
          consensusTimeframeParam: 'performance1d',
          executionTimeframeParam: 'performance1d',
        };
      }
      case 'weekly': {
        return {
          consensusTimeframeParam: 'performance7d',
          executionTimeframeParam: 'performance7d',
        };
      }
      case 'monthly': {
        return {
          consensusTimeframeParam: 'performance31d',
          executionTimeframeParam: 'performance31d',
        };
      }
      case 'annual': {
        return {
          consensusTimeframeParam: 'performance365d',
          executionTimeframeParam: 'performance365d',
        };
      }
      case 'total': {
        return {
          consensusTimeframeParam: 'performancetotal',
          executionTimeframeParam: 'performanceTotal',
        };
      }
    }
  };

  const getTimeframeTitle = () => {
    switch (timeframe) {
      case 'daily': {
        return 'Daily Earnings';
      }
      case 'weekly': {
        return 'Weekly Earnings';
      }
      case 'monthly': {
        return 'Monthly Earnings';
      }
      case 'annual': {
        return 'Annual Earnings';
      }
      case 'total': {
        return 'Total Earnings';
      }
    }
  };

  const calculateEarnings = () => {
    let totalEarnings = 0;
    const { consensusTimeframeParam, executionTimeframeParam } =
      getTimeframeParamNames();

    for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
      const withdrawalAddress = selectedGroup.withdrawalAddresses[i].address;

      for (const validatorIndex in validatorsPerformance[withdrawalAddress]) {
        if (
          validatorsPerformance[withdrawalAddress][validatorIndex]
            .consensusPerformance
        ) {
          totalEarnings +=
            validatorsPerformance[withdrawalAddress][validatorIndex]
              .consensusPerformance[consensusTimeframeParam] / 1e9;
        }
        if (
          validatorsPerformance[withdrawalAddress][validatorIndex]
            .executionPerformance
        ) {
          totalEarnings +=
            validatorsPerformance[withdrawalAddress][validatorIndex]
              .executionPerformance[executionTimeframeParam] / 1e18;
        }
      }
    }

    return totalEarnings;
  };

  const getErningsComparedToAPR = (earnings: number) => {
    if (timeframe !== 'total') {
      const stakingAPR = getTimeframePercentageYieldUnformated({
        totalAtStake: stakedLYX / 1e9,
        timeframe,
      });
      const earningsAPR = (earnings / (activeBalance / 1e9)) * 100;

      if (earningsAPR > stakingAPR) {
        return (
          <span className="text-pastel-green">{`${earnings.toLocaleString()} LYX`}</span>
        );
      }
      return (
        <span className="text-pastel-red">{`${earnings.toLocaleString()} LYX`}</span>
      );
    }
    return `${earnings.toLocaleString()} LYX`;
  };

  const generateEarnings = () => {
    const earnings = calculateEarnings();

    return (
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">
          {getTimeframeTitle()}
        </div>
        <p className="text-slate-gray font-bold">
          {getErningsComparedToAPR(earnings)}
        </p>
        {timeframe !== 'total' ? (
          <p className="text-xs">{`(Aproximate APR ${(
            (earnings / (activeBalance / 1e9)) * 100 || 0
          ).toLocaleString()} %)`}</p>
        ) : (
          <></>
        )}
        <DisplayTokenPrice tokenPrice={tokenPrice} tokenAmount={earnings} />
      </div>
    );
  };

  return generateEarnings();
};
