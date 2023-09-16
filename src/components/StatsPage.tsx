// Stats Tiles
import { LYXPrice } from "./stats/LYXPrice";
import { Earnings } from "./stats/Earnings";
import { APYRate } from "./stats/APYRate";
import { Performance } from "./stats/Performance";
import { Luck } from "./stats/Luck";
import { Validators } from "./stats/Validators";
import { Balance } from "./stats/Balance";
import { TotalWithdrawals } from "./stats/TotalWithdrawals";
import { WithdrawalBalance } from "./stats/WithdrawalBalance";

// ts types
import { StatsPageParams } from "../typings/types";
import { WithdrawableAmount } from "./stats/WithdrawableAmount";
import { useEffect, useState } from "react";

export const StatsPage = ({
  stakedLYX,
  eurPrice,
  usdPrice,
  activeValidators,
  pendingValidators,
  slashedValidators,
  otherValidators,
  validatorsLuck,
  validatorsPerformance,
  withdrawalAddressesBalance,
  validatorMapsNeedUpdate,
  networkDataNeedsUpdate,
  luckNeedsUpdate,
  performanceNeedsUpdate,
  LYXPriceNeedsUpdate,
  withdrawalAddressesBalanceNeedsUpdate,
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
    "bg-pastel-light-pink p-2 m-2 rounded-lg shadow text-center flex flex-col items-center justify-center";

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <Validators
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        pendingValidators={pendingValidators}
        slashedValidators={slashedValidators}
        otherValidators={otherValidators}
        validatorMapsNeedUpdate={validatorMapsNeedUpdate}
      />
      <Balance
        tileClasses={tileClasses}
        activeBalance={activeBalance}
        pendingBalance={pendingBalance}
        slashedBalance={slashedBalance}
        otherBalance={otherBalance}
        validatorMapsNeedUpdate={validatorMapsNeedUpdate}
      />
      <WithdrawableAmount
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        pendingValidators={pendingValidators}
        slashedValidators={slashedValidators}
        otherValidators={otherValidators}
        activeBalance={activeBalance}
        pendingBalance={pendingBalance}
        slashedBalance={slashedBalance}
        otherBalance={otherBalance}
        validatorMapsNeedUpdate={validatorMapsNeedUpdate}
      />
      <TotalWithdrawals
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorMapsNeedUpdate={validatorMapsNeedUpdate}
      />
      <WithdrawalBalance
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        withdrawalAddressesBalance={withdrawalAddressesBalance}
        withdrawalAddressesBalanceNeedsUpdate={
          withdrawalAddressesBalanceNeedsUpdate
        }
      />
      <LYXPrice
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        LYXPriceNeedsUpdate={LYXPriceNeedsUpdate}
      />
      <Earnings
        timeframe="weekly"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorsPerformance={validatorsPerformance}
        LYXPriceNeedsUpdate={LYXPriceNeedsUpdate}
        performanceNeedsUpdate={performanceNeedsUpdate}
      />
      <Earnings
        timeframe="monthly"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorsPerformance={validatorsPerformance}
        LYXPriceNeedsUpdate={LYXPriceNeedsUpdate}
        performanceNeedsUpdate={performanceNeedsUpdate}
      />
      <Earnings
        timeframe="total"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorsPerformance={validatorsPerformance}
        LYXPriceNeedsUpdate={LYXPriceNeedsUpdate}
        performanceNeedsUpdate={performanceNeedsUpdate}
      />
      <APYRate
        tileClasses={tileClasses}
        timeframe="annual"
        stakedLYX={stakedLYX}
        networkDataNeedsUpdate={networkDataNeedsUpdate}
      />
      <APYRate
        tileClasses={tileClasses}
        timeframe="monthly"
        stakedLYX={stakedLYX}
        networkDataNeedsUpdate={networkDataNeedsUpdate}
      />
      <Performance
        tileClasses={tileClasses}
        validatorsPerformance={validatorsPerformance}
        performanceNeedsUpdate={performanceNeedsUpdate}
      />
      <Luck
        tileClasses={tileClasses}
        validatorsLuck={validatorsLuck}
        luckNeedsUpdate={luckNeedsUpdate}
      />
    </div>
  );
};
