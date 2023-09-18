import { getTimeframePercentageYield } from "../../helpers/calculateStakingRewards";
import { TimeframePercentageRateParams } from "../../typings/types";

export const TimeframePercentageRate = ({
  timeframe,
  tileClasses,
  stakedLYX,
}: TimeframePercentageRateParams) => {
  let getTimeframeTitle = () => {
    switch (timeframe) {
      case "daily": {
        return "Daily Rate";
      }
      case "weekly": {
        return "Weekly Rate";
      }
      case "monthly": {
        return "Monthly Rate";
      }
      case "annual": {
        return "Annual Rate";
      }
    }
  };

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">{getTimeframeTitle()}</div>
      <p className="text-gray-600 font-bold">
        {`${getTimeframePercentageYield({
          totalAtStake: stakedLYX / 1e9,
          timeframe,
        })} %`}
      </p>
    </div>
  );
};