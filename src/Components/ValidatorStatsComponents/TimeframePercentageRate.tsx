// utils
import { getTimeframePercentageYield } from "../../Helpers/calculateStakingRewards";

// types
import { TimeframePercentageRateParams } from "../../Types/ComponentParamsTypes";

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
      <p className="text-slate-gray font-bold">
        {`${getTimeframePercentageYield({
          totalAtStake: stakedLYX / 1e9,
          timeframe,
        })} %`}
      </p>
    </div>
  );
};
