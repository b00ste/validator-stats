// Stats Tiles
import { Earnings } from "./ValidatorStats/Earnings";
import { APYRate } from "./ValidatorStats/APYRate";
import { Performance } from "./ValidatorStats/Performance";
import { Luck } from "./ValidatorStats/Luck";
import { Validators } from "./ValidatorStats/Validators";
import { Balance } from "./ValidatorStats/Balance";
import { TotalWithdrawals } from "./ValidatorStats/TotalWithdrawals";
import { WithdrawalBalance } from "./ValidatorStats/WithdrawalBalance";

// ts types
import { StatsPageParams } from "../typings/types";
import { WithdrawableAmount } from "./ValidatorStats/WithdrawableAmount";
import { useEffect, useState } from "react";

export const StatsPage = ({
  stakedLYX,
  tokenPrice: { eurPrice, usdPrice },
  validatorsData: {
    validatorsMaps: {
      activeValidators,
      pendingValidators,
      slashedValidators,
      otherValidators,
    },
    validatorsLuck,
    validatorsPerformance,
  },
  withdrawalAddressesBalance,
}: StatsPageParams) => {
  const [activeBalance, setActiveBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [slashedBalance, setSlashedBalance] = useState(0);
  const [otherBalance, setOtherBalance] = useState(0);

  useEffect(() => {
    let newActiveBalance = 0;
    for (const activeValidator in activeValidators) {
      newActiveBalance += activeValidators[activeValidator].balance;
    }
    setActiveBalance(newActiveBalance);

    let newPendingBalance = 0;
    for (const pendingValidator in pendingValidators) {
      newPendingBalance += pendingValidators[pendingValidator].balance;
    }
    setPendingBalance(newPendingBalance);

    let newSlashedBalance = 0;
    for (const slashedValidator in slashedValidators) {
      newSlashedBalance += slashedValidators[slashedValidator].balance;
    }
    setSlashedBalance(newSlashedBalance);

    let newOtherBalance = 0;
    for (const otherValidator in otherValidators) {
      newOtherBalance += otherValidators[otherValidator].balance;
    }
    setOtherBalance(newOtherBalance);
  }, [activeValidators, pendingValidators, slashedValidators, otherValidators]);

  const tileClasses =
    "relative bg-pastel-light-pink p-2 m-2 rounded-lg shadow text-center flex flex-col items-center justify-center";

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Validators
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        pendingValidators={pendingValidators}
        slashedValidators={slashedValidators}
        otherValidators={otherValidators}
      />
      <Balance
        tileClasses={tileClasses}
        activeBalance={activeBalance}
        pendingBalance={pendingBalance}
        slashedBalance={slashedBalance}
        otherBalance={otherBalance}
      />
      <WithdrawableAmount
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        activeValidators={activeValidators}
        activeBalance={activeBalance}
      />
      <TotalWithdrawals
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
      />
      <WithdrawalBalance
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        withdrawalAddressesBalance={withdrawalAddressesBalance}
      />
      <Earnings
        timeframe="daily"
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="weekly"
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="monthly"
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="yearly"
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="total"
        tileClasses={tileClasses}
        eurPrice={eurPrice}
        usdPrice={usdPrice}
        validatorsPerformance={validatorsPerformance}
      />
      <APYRate
        tileClasses={tileClasses}
        timeframe="annual"
        stakedLYX={stakedLYX}
      />
      <APYRate
        tileClasses={tileClasses}
        timeframe="monthly"
        stakedLYX={stakedLYX}
      />
      <Performance
        tileClasses={tileClasses}
        validatorsPerformance={validatorsPerformance}
      />
      <Luck tileClasses={tileClasses} validatorsLuck={validatorsLuck} />
    </div>
  );
};
