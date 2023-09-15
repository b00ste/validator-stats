import { ValidatorsPerformance } from "../../typings/types";

type EarningsParams = {
  timeframe: "weekly" | "monthly" | "total";
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  validatorsPerformance: ValidatorsPerformance;
  LYXPriceNeedsUpdate: boolean;
  performanceNeedsUpdate: boolean;
};

export const Earnings = ({
  timeframe,
  tileClasses,
  eurPrice,
  usdPrice,
  validatorsPerformance,
  LYXPriceNeedsUpdate,
  performanceNeedsUpdate,
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
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Weekly Earnings</div>
        {performanceNeedsUpdate || LYXPriceNeedsUpdate ? (
          <div className="loading-animation" />
        ) : (
          <>
            <p className="text-gray-600">
              {`${calculateWeeklyEarnings().toFixed(2)} LYX`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateWeeklyEarnings() * Number.parseFloat(eurPrice)
              ).toFixed(2)} €`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateWeeklyEarnings() * Number.parseFloat(usdPrice)
              ).toFixed(2)} €`}
            </p>
          </>
        )}
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
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Yearly Earnings</div>
        {performanceNeedsUpdate || LYXPriceNeedsUpdate ? (
          <div className="loading-animation" />
        ) : (
          <>
            <p className="text-gray-600">
              {`${calculateMonthlyEarnings().toFixed(2)} LYX`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateMonthlyEarnings() * Number.parseFloat(eurPrice)
              ).toFixed(2)} €`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateMonthlyEarnings() * Number.parseFloat(usdPrice)
              ).toFixed(2)} €`}
            </p>
          </>
        )}
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
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">Total Earnings</div>
        {performanceNeedsUpdate || LYXPriceNeedsUpdate ? (
          <div className="loading-animation" />
        ) : (
          <>
            <p className="text-gray-600">
              {`${calculateTotalEarnings().toFixed(2)} LYX`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateTotalEarnings() * Number.parseFloat(eurPrice)
              ).toFixed(2)} €`}
            </p>
            <p className="text-gray-600">
              {`${(
                calculateTotalEarnings() * Number.parseFloat(usdPrice)
              ).toFixed(2)} €`}
            </p>
          </>
        )}
      </div>
    );
  }

  return <></>;
};
