import earnings from "../../assets/earnings.png";
import { ValidatorsPerformance } from "../../typings/types";

type EarningsParams = {
  timeframe: "weekly" | "monthly" | "total";
  tileStyle: string;
  titleStyle: string;
  eurPrice: string;
  usdPrice: string;
  validatorsPerformance: ValidatorsPerformance;
};

export const Earnings = ({
  timeframe,
  tileStyle,
  titleStyle,
  eurPrice,
  usdPrice,
  validatorsPerformance,
}: EarningsParams) => {
  if (timeframe === "weekly") {
    const calculateWeeklyEarnings = () => {
      let weeklyTotalEarnings = 0;
      for (const index in validatorsPerformance) {
        weeklyTotalEarnings +=
          validatorsPerformance[index].consensusPerformance.performance7d / 1e9;
        weeklyTotalEarnings +=
          validatorsPerformance[index].executionPerformance.performance7d /
          1e18;
      }

      return weeklyTotalEarnings;
    };

    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Weekly earnings</p>
          <p>{calculateWeeklyEarnings().toFixed(2)} LYX</p>
          <p>
            {(calculateWeeklyEarnings() * Number.parseFloat(eurPrice)).toFixed(
              2
            )}{" "}
            €
          </p>
          <p>
            {(calculateWeeklyEarnings() * Number.parseFloat(usdPrice)).toFixed(
              2
            )}{" "}
            $
          </p>
        </div>
      </div>
    );
  } else if (timeframe === "monthly") {
    const calculateMonthlyEarnings = () => {
      let weeklyTotalEarnings = 0;
      for (const index in validatorsPerformance) {
        weeklyTotalEarnings +=
          validatorsPerformance[index].consensusPerformance.performance31d /
          1e9;
        weeklyTotalEarnings +=
          validatorsPerformance[index].executionPerformance.performance31d /
          1e18;
      }

      return weeklyTotalEarnings;
    };

    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Monthly earnings</p>
          <p>{calculateMonthlyEarnings().toFixed(2)} LYX</p>
          <p>
            {(calculateMonthlyEarnings() * Number.parseFloat(eurPrice)).toFixed(
              2
            )}{" "}
            €
          </p>
          <p>
            {(calculateMonthlyEarnings() * Number.parseFloat(usdPrice)).toFixed(
              2
            )}{" "}
            $
          </p>
        </div>
      </div>
    );
  } else if (timeframe === "total") {
    const calculateTotalEarnings = () => {
      let weeklyTotalEarnings = 0;
      for (const index in validatorsPerformance) {
        weeklyTotalEarnings +=
          validatorsPerformance[index].consensusPerformance.performancetotal /
          1e9;
        weeklyTotalEarnings +=
          validatorsPerformance[index].executionPerformance.performanceTotal /
          1e18;
      }

      return weeklyTotalEarnings;
    };

    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Total earnings</p>
          <p>{calculateTotalEarnings().toFixed(2)} LYX</p>
          <p>
            {(calculateTotalEarnings() * Number.parseFloat(eurPrice)).toFixed(
              2
            )}{" "}
            €
          </p>
          <p>
            {(calculateTotalEarnings() * Number.parseFloat(usdPrice)).toFixed(
              2
            )}{" "}
            $
          </p>
        </div>
      </div>
    );
  }

  return <></>;
};
