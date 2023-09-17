import { APYRateParams } from "../../typings/types";

export const APYRate = ({
  timeframe,
  tileClasses,
  stakedLYX,
}: APYRateParams) => {
  const getAnualBaseReward = () => {
    const EPOCHS_PER_YEAR = 82180;

    return (EPOCHS_PER_YEAR * 512) / Math.sqrt(stakedLYX);
  };

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

  const getTimeframePercentageYield = () => {
    const ideal_reward = 4 * getAnualBaseReward();

    const annualAPY = (100 * ideal_reward) / 32;
    switch (timeframe) {
      case "daily": {
        return annualAPY / 365;
      }
      case "weekly": {
        return (annualAPY / 365) * 7;
      }
      case "monthly": {
        return annualAPY / 12;
      }
      case "annual": {
        return annualAPY;
      }
    }
  };

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">{getTimeframeTitle()}</div>
      <p className="text-gray-600 font-bold">
        {`${getTimeframePercentageYield().toFixed(2)} %`}
      </p>
    </div>
  );
};
