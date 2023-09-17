import { EarningsParams } from "../../typings/types";

export const Earnings = ({
  timeframe,
  tileClasses,
  eurPrice,
  usdPrice,
  validatorsPerformance,
}: EarningsParams) => {
  const getTimeframeParamNames = (): {
    consensusTimeframeParam:
      | "performance1d"
      | "performance7d"
      | "performance31d"
      | "performance365d"
      | "performancetotal";
    executionTimeframeParam:
      | "performance1d"
      | "performance7d"
      | "performance31d"
      | "performance365d"
      | "performanceTotal";
  } => {
    switch (timeframe) {
      case "daily": {
        return {
          consensusTimeframeParam: "performance1d",
          executionTimeframeParam: "performance1d",
        };
      }
      case "weekly": {
        return {
          consensusTimeframeParam: "performance7d",
          executionTimeframeParam: "performance7d",
        };
      }
      case "monthly": {
        return {
          consensusTimeframeParam: "performance31d",
          executionTimeframeParam: "performance31d",
        };
      }
      case "annual": {
        return {
          consensusTimeframeParam: "performance365d",
          executionTimeframeParam: "performance365d",
        };
      }
      case "total": {
        return {
          consensusTimeframeParam: "performancetotal",
          executionTimeframeParam: "performanceTotal",
        };
      }
    }
  };

  let getTitle = () => {
    switch (timeframe) {
      case "daily": {
        return "Daily Earnings";
      }
      case "weekly": {
        return "Weekly Earnings";
      }
      case "monthly": {
        return "Monthly Earnings";
      }
      case "annual": {
        return "Annual Earnings";
      }
      case "total": {
        return "Total Earnings";
      }
    }
  };

  const generateEarnings = () => {
    const calculateEarnings = () => {
      let weeklyTotalEarnings = 0;
      const { consensusTimeframeParam, executionTimeframeParam } =
        getTimeframeParamNames();
      for (const index in validatorsPerformance) {
        weeklyTotalEarnings +=
          validatorsPerformance[index].consensusPerformance[
            consensusTimeframeParam
          ] / 1e9;
        weeklyTotalEarnings +=
          validatorsPerformance[index].executionPerformance[
            executionTimeframeParam
          ] / 1e18;
      }

      return weeklyTotalEarnings;
    };

    const earnings = calculateEarnings();

    return (
      <div className={tileClasses}>
        <div className="text-pastel-blue text-xl mb-2">{getTitle()}</div>
        <p className="text-gray-600 font-bold">
          {`${earnings.toFixed(2)} LYX`}
        </p>
        <p className="text-gray-600 font-bold">
          {`${(earnings * Number.parseFloat(eurPrice)).toFixed(2)} €`}
        </p>
        <p className="text-gray-600 font-bold">
          {`${(earnings * Number.parseFloat(usdPrice)).toFixed(2)} €`}
        </p>
      </div>
    );
  };

  return generateEarnings();
};
