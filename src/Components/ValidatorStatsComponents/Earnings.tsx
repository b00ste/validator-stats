import { useContext } from 'react';

// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// helpers
import {
  getTimeframePercentageYield,
  getTimeframePercentageYieldUnformated,
} from '../../Helpers/calculateStakingRewards';

// types
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

// context
import { NetworkContext, ValidatorsDataContext } from '../../App';

interface Props {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual' | 'total';
  activeBalance: number;
  selectedGroup: WithdrawalAddressesGroup;
}

export const Earnings: React.FC<Props> = ({
  timeframe,
  activeBalance,
  selectedGroup,
}) => {
  const { validatorsPerformance = {} } = useContext(ValidatorsDataContext);
  const { stakedLYX = 0 } = useContext(NetworkContext);

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
          <span className="text-green-45">{`${earnings.toLocaleString()} LYX`}</span>
        );
      }
      return (
        <span className="text-red-55">{`${earnings.toLocaleString()} LYX`}</span>
      );
    }
    return `${earnings.toLocaleString()} LYX`;
  };

  const generateEarnings = () => {
    const earnings = calculateEarnings();

    return (
      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div
            slot="content"
            className="p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="heading-inter-21-semi-bold mb-4 text-purple-31">
              {getTimeframeTitle()}
            </h2>
            <div className="w-full flex flex-col justify-center items-center">
              {timeframe !== 'total' ? (
                <div className="flex flex-row flex-wrap justify-around border-b border-lukso-70 mb-2">
                  <p className="paragraph-inter-14-medium p-1">
                    Calculated APR
                  </p>
                  <div className="flex flex-col justify-center p-1">
                    <p className="paragraph-inter-14-medium">
                      {`${getTimeframePercentageYield({
                        totalAtStake: stakedLYX / 1e9,
                        timeframe,
                      }).toLocaleString()} %`}
                    </p>
                    <p className="paragraph-inter-12-medium">{`(Aproximate earnings: ${(
                      (activeBalance / 1e9 / 100) *
                      getTimeframePercentageYield({
                        totalAtStake: stakedLYX / 1e9,
                        timeframe,
                      })
                    ).toLocaleString()} LYX)`}</p>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="flex flex-row flex-wrap justify-around items-center">
                <p className="paragraph-inter-14-medium p-1">Real Earnings</p>
                <div className="flex flex-col justify-center p-1">
                  <p className="paragraph-inter-14-medium">
                    {getErningsComparedToAPR(earnings)}
                  </p>
                  {timeframe !== 'total' ? (
                    <p className="paragraph-inter-12-medium">{`(Aproximate APR ${(
                      (earnings / (activeBalance / 1e9)) * 100 || 0
                    ).toLocaleString()} %)`}</p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <DisplayTokenPrice tokenAmount={earnings} />
          </div>
        </lukso-card>
      </div>
    );
  };

  return generateEarnings();
};
