import { useEffect, useState } from "react";

import { LYXPrice } from "./stats/LYXPrice";
import { Earnings } from "./stats/Earnings";
import { APYRate } from "./stats/APYRate";
import { Performance } from "./stats/Performance";
import { Luck } from "./stats/Luck";
import { Validators } from "./stats/Validators";
import { Balance } from "./stats/Balance";
import { Withdrawals } from "./stats/Withdrawals";
import { WithdrawalBalance } from "./stats/WithdrawalBalance";

import {
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
} from "../helpers/validators";
import {
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
} from "../typings/types";

type StatsPageParams = {
  publicKeys: PublicKey[];
  stakedLYX: number;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
  networkDataNeedsUpdate: boolean;
  setNetworkDataNeedsUpdate: Function;
};

export const StatsPage = ({
  publicKeys,
  stakedLYX,
  activeValidators,
  pendingValidators,
  slashedValidators,
  otherValidators,
  networkDataNeedsUpdate,
  setNetworkDataNeedsUpdate,
}: StatsPageParams) => {
  const [validatorsLuck, setValidatorsLuck] = useState({} as ValidatorsLuck);
  const [luckNeedsUpdate, setLuckNeedsUpdate] = useState(true);

  const [validatorsPerformance, setValidatorsPerformance] = useState(
    {} as ValidatorsPerformance
  );
  const [performanceNeedsUpdate, setPerformanceNeedsUpdate] = useState(true);

  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);
  const [LYXPriceNeedsUpdate, setLYXPriceNeedsUpdate] = useState(true);

  // Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (LYXPriceNeedsUpdate) {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=lukso-token-2&vs_currencies=eur%2Cusd"
      )
        .then((res) => res.json())
        .then((data) => {
          setEurPrce(data["lukso-token-2"].eur);
          setUsdPrce(data["lukso-token-2"].usd);
        });

      setLYXPriceNeedsUpdate(false);
    }
  }, [LYXPriceNeedsUpdate]);

  // Update validators luck
  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      luckNeedsUpdate
    ) {
      let fetchedData = fetchValidatorsLuck(activeValidators);

      fetchedData.then((data) => setValidatorsLuck(data));
      setLuckNeedsUpdate(false);
    }
  }, [activeValidators, luckNeedsUpdate]);

  // Update validators performance
  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      performanceNeedsUpdate
    ) {
      let fetchedData = fetchValidatorsPerformance(activeValidators);

      fetchedData.then((data) => setValidatorsPerformance(data));
      setPerformanceNeedsUpdate(false);
    }
  }, [activeValidators, performanceNeedsUpdate]);

  useEffect(() => {
    if (
      !networkDataNeedsUpdate &&
      !luckNeedsUpdate &&
      !performanceNeedsUpdate &&
      !LYXPriceNeedsUpdate
    ) {
      const id = setInterval(() => {
        setLuckNeedsUpdate(true);
        setPerformanceNeedsUpdate(true);
        setLYXPriceNeedsUpdate(true);
        setNetworkDataNeedsUpdate(true);
      }, 300000);
      return () => clearInterval(id);
    }
  }, [
    luckNeedsUpdate,
    performanceNeedsUpdate,
    LYXPriceNeedsUpdate,
    networkDataNeedsUpdate,
    setNetworkDataNeedsUpdate,
  ]);

  const tileClasses =
    "bg-pastel-light-pink p-2 m-2 rounded-lg shadow text-center flex flex-col items-center justify-center";

  return (
    <div className="container mx-auto mt-40 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <LYXPrice
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
      />
      <Earnings
        timeframe="weekly"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="monthly"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="total"
        tileClasses={tileClasses}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
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
      <Validators
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        pendingValidators={pendingValidators}
        slashedValidators={slashedValidators}
        otherValidators={otherValidators}
      />
      <Balance
        tileClasses={tileClasses}
        activeValidators={activeValidators}
        pendingValidators={pendingValidators}
      />
      <Withdrawals
        tileClasses={tileClasses}
        activeValidators={activeValidators}
      />
      <WithdrawalBalance
        tileClasses={tileClasses}
        publicKeys={publicKeys}
        eurPrice={eurPrice ? eurPrice : ""}
        usdPrice={usdPrice ? usdPrice : ""}
      />
    </div>
  );
};
