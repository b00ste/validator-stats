import percentage_yield from "../../assets/percentage_yield.png";

type APYRateParams = {
  timeframe: "monthly" | "annual";
  tileStyle: string;
  titleStyle: string;
  stakedLYX: number;
};

export const APYRate = ({
  timeframe,
  tileStyle,
  titleStyle,
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
      <div className={tileStyle}>
        <img
          src={percentage_yield}
          className="w-10 h-10"
          alt="percentage_yield"
        />
        <div>
          <p className={titleStyle}>Annual rate</p>
          <p>{getAnualPercentageYield().toFixed(2)} %</p>
        </div>
      </div>
    );
  } else if (timeframe === "monthly") {
    return (
      <div className={tileStyle}>
        <img
          src={percentage_yield}
          className="w-10 h-10"
          alt="percentage_yield"
        />
        <div>
          <p className={titleStyle}>Monthly rate</p>
          <p>{(getAnualPercentageYield() / 12).toFixed(2)} %</p>
        </div>
      </div>
    );
  }

  return <></>;
};
