type APYRateParams = {
  timeframe: "monthly" | "annual";
  tileClasses: string;
  stakedLYX: number;
  networkDataNeedsUpdate: boolean;
};

export const APYRate = ({
  timeframe,
  tileClasses,
  stakedLYX,
  networkDataNeedsUpdate,
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
        {networkDataNeedsUpdate ? (
          <div className="loading-animation" />
        ) : (
          <p className="text-gray-600">
            {`${getAnualPercentageYield().toFixed(2)} %`}
          </p>
        )}
      </div>
    );
  } else if (timeframe === "monthly") {
    return (
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Monthly Rate</div>
        {networkDataNeedsUpdate ? (
          <div className="loading-animation" />
        ) : (
          <p className="text-gray-600">
            {`${(getAnualPercentageYield() / 12).toFixed(2)} %`}
          </p>
        )}
      </div>
    );
  }

  return <></>;
};
