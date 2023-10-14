// utils
import { getTimeframePercentageYield } from '../../Helpers/calculateStakingRewards';

// theme
import { validatorStatsSpecificTileClasses } from '../../Theme/theme';

// types
import { TimeframePercentageRateParams } from '../../Types/ComponentParamsTypes';

export const TimeframePercentageRate = ({
  timeframe,
  stakedLYX,
  activeBalance,
}: TimeframePercentageRateParams) => {
  let getTimeframeTitle = () => {
    switch (timeframe) {
      case 'daily': {
        return 'Daily Rate';
      }
      case 'weekly': {
        return 'Weekly Rate';
      }
      case 'monthly': {
        return 'Monthly Rate';
      }
      case 'annual': {
        return 'Annual Rate';
      }
    }
  };

  return (
    <div className={validatorStatsSpecificTileClasses}>
      <div className="text-pastel-blue text-xl mb-2">{getTimeframeTitle()}</div>
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
  );
};
