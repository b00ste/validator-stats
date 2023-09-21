import { useEffect, useState } from "react";

// Stats Tiles
import { Earnings } from "../ValidatorStats/Earnings";
import { TimeframePercentageRate } from "../ValidatorStats/TimeframePercentageRate";
import { Attestations } from "../ValidatorStats/Attestations";
import { Luck } from "../ValidatorStats/Luck";
import { Validators } from "../ValidatorStats/Validators";
import { Balance } from "../ValidatorStats/Balance";
import { TotalWithdrawals } from "../ValidatorStats/TotalWithdrawals";
import { WithdrawalBalance } from "../ValidatorStats/WithdrawalBalance";
import { WithdrawableAmount } from "../ValidatorStats/WithdrawableAmount";

// ts types
import { StatsPageParams } from "../../typings/ComponentParamsTypes";

export const ValidatorStatsPage = ({
  mountStatsPage,
  bodyClasses,
  stakedLYX,
  tokenPrice,
  validatorsData: { validatorsMaps, validatorsLuck, validatorsPerformance },
  withdrawalAddressesBalance,
}: StatsPageParams) => {
  const {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  } = validatorsMaps;
  const [activeBalance, setActiveBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [offlineBalance, setOfflineBalance] = useState(0);
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

    let newOfflineBalance = 0;
    for (const offlineValidator in offlineValidators) {
      newOfflineBalance += offlineValidators[offlineValidator].balance;
    }
    setOfflineBalance(newOfflineBalance);

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
  }, [
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  ]);

  /// ------ Styling Handling ------
  const [opacity, setOpacity] = useState("opacity-0");
  // Run on mount
  useEffect(() => {
    setOpacity("opacity-100");
  }, []);
  // Run on un-mount
  useEffect(() => {
    if (!mountStatsPage) {
      setOpacity("opacity-0");
    }
  }, [mountStatsPage]);

  const tileClasses =
    "bg-pastel-light-pink p-2 rounded-lg shadow text-center flex flex-col items-center justify-center";
  /// ------------------------------

  return (
    <div
      className={`${bodyClasses} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${opacity}`}
    >
      <Validators tileClasses={tileClasses} validatorsMaps={validatorsMaps} />
      <Balance
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        validatorsBalances={{
          activeBalance,
          pendingBalance,
          offlineBalance,
          slashedBalance,
          otherBalance,
        }}
      />
      <WithdrawableAmount
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        activeValidators={activeValidators}
        activeBalance={activeBalance}
      />
      <TotalWithdrawals
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        tokenPrice={tokenPrice}
      />
      <WithdrawalBalance
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        withdrawalAddressesBalance={withdrawalAddressesBalance}
      />
      <Earnings
        timeframe="daily"
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="weekly"
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="monthly"
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="annual"
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="total"
        tileClasses={tileClasses}
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Attestations
        tileClasses={tileClasses}
        validatorsPerformance={validatorsPerformance}
      />
      <Luck tileClasses={tileClasses} validatorsLuck={validatorsLuck} />
      <TimeframePercentageRate
        tileClasses={tileClasses}
        timeframe="daily"
        stakedLYX={stakedLYX}
      />
      <TimeframePercentageRate
        tileClasses={tileClasses}
        timeframe="weekly"
        stakedLYX={stakedLYX}
      />
      <TimeframePercentageRate
        tileClasses={tileClasses}
        timeframe="monthly"
        stakedLYX={stakedLYX}
      />
      <TimeframePercentageRate
        tileClasses={tileClasses}
        timeframe="annual"
        stakedLYX={stakedLYX}
      />
    </div>
  );
};
