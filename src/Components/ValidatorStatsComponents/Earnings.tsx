// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// helpers
import {
  getTimeframePercentageYield,
  getTimeframePercentageYieldUnformated,
} from '../../Helpers/calculateStakingRewards';

// theme
import { validatorStatsSpecificTileClasses } from '../../Theme/theme';

// ts types
import { EarningsParams } from '../../Types/ComponentParamsTypes';

export const Earnings = ({
  timeframe,
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
      <div className={validatorStatsSpecificTileClasses}>
        <div className="text-pastel-blue text-xl mb-2">
          {getTimeframeTitle()}
        </div>
        <div className="w-full grid grid-cols-3 justify-around content-center">
          {timeframe !== 'total' ? (
            <>
              <div className="col-span-1 flex justify-start">
                <p className="text-slate-gray font-bold px-1">Calculated APR</p>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <p className="text-slate-gray font-bold">
                  {`${getTimeframePercentageYield({
                    totalAtStake: stakedLYX / 1e9,
                    timeframe,
                  }).toLocaleString()} %`}
                </p>
                <p className="text-xs">{`(Aproximate earnings: ${(
                  (activeBalance / 1e9 / 100) *
                  getTimeframePercentageYield({
                    totalAtStake: stakedLYX / 1e9,
                    timeframe,
                  })
                ).toLocaleString()} LYX)`}</p>
              </div>
              <div className="border-dark-pink col-span-3 border-b my-2 mx-4" />
            </>
          ) : (
            <></>
          )}
          <div className="flex justify-start content-start col-span-1">
            <p className="text-slate-gray font-bold px-1">Real Earnings</p>
          </div>
          <div className="col-span-2 flex flex-col justify-center">
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
          </div>
        </div>
        <DisplayTokenPrice tokenPrice={tokenPrice} tokenAmount={earnings} />
      </div>
    );
  };

  return generateEarnings();
};
