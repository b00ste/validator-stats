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

  const getAnualPercentageYield = () => {
    const ideal_reward = 4 * getAnualBaseReward();

    return (100 * ideal_reward) / 32;
  };

  if (timeframe === "annual") {
    return (
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Annual Rate</div>
        <p className="text-gray-600 font-bold">
          {`${getAnualPercentageYield().toFixed(2)} %`}
        </p>
      </div>
    );
  } else if (timeframe === "monthly") {
    return (
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Monthly Rate</div>
        <p className="text-gray-600 font-bold">
          {`${(getAnualPercentageYield() / 12).toFixed(2)} %`}
        </p>
      </div>
    );
  }

  return <></>;
};
