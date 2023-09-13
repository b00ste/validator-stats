import earnings from "../assets/earnings.png";
import { Validator } from "../typings/types";

export const Earnings = ({
  timeframe,
  tileStyle,
  titleStyle,
  eurPrice,
  usdPrice,
  activeValidatorsBalance,
  activeValidatorList,
}: {
  timeframe: "weekly" | "monthly" | "total";
  tileStyle: string;
  titleStyle: string;
  eurPrice: string;
  usdPrice: string;
  activeValidatorsBalance: number;
  activeValidatorList: Validator[];
}) => {
  if (timeframe === "weekly") {
    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Weekly earnings</p>
        </div>
      </div>
    );
  } else if (timeframe === "monthly") {
    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Monthly earnings</p>
        </div>
      </div>
    );
  } else if (timeframe === "total") {
    return (
      <div className={tileStyle}>
        <img src={earnings} className="w-10 h-10" alt="earnings" />
        <div>
          <p className={titleStyle}>Total earnings</p>
          <p id="total_earnings_lyx">
            {`${
              activeValidatorsBalance && activeValidatorList
                ? (
                    activeValidatorsBalance / 1e9 -
                    32 * activeValidatorList.length
                  ).toFixed(2)
                : 0
            } LYX`}
          </p>
          <p id="total_earnings_eur">{`${
            activeValidatorsBalance && activeValidatorList
              ? (
                  Number.parseFloat(
                    (
                      activeValidatorsBalance / 1e9 -
                      32 * activeValidatorList.length
                    ).toFixed(2)
                  ) * Number.parseFloat(eurPrice ? eurPrice : "")
                ).toFixed(2)
              : 0
          } EUR`}</p>
          <p id="total_earnings_usd">{`${
            activeValidatorsBalance && activeValidatorList
              ? (
                  Number.parseFloat(
                    (
                      activeValidatorsBalance / 1e9 -
                      32 * activeValidatorList.length
                    ).toFixed(2)
                  ) * Number.parseFloat(usdPrice ? usdPrice : "")
                ).toFixed(2)
              : 0
          } USD`}</p>
        </div>
      </div>
    );
  }

  return <></>;
};
