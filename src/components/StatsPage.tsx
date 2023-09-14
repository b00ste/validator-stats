import { useEffect, useState } from "react";

import { Validators } from "./stats/Validators";
import { Performance } from "./stats/Performance";
import { Balance } from "./stats/Balance";
import { Earnings } from "./stats/Earnings";
import { LYXPrice } from "./stats/LYXPrice";
import { APYRate } from "./stats/APYRate";
import { Luck } from "./stats/Luck";

import {
  fetchValidators,
  fetchValidatorsBalance,
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
  fetchValidatorsWithdrawals,
} from "../helpers/validators";
import { getLastEpoch } from "../helpers/network";
import {
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
  ValidatorsWithdrawals,
} from "../typings/types";
import { Withdrawals } from "./stats/Withdrawals";
import { WithdrawalBalance } from "./stats/WithdrawalBalance";

export const StatsPage = () => {
  const storedPublicKeys = localStorage.getItem("publicKeys");
  const [publicKeys] = useState(
    (storedPublicKeys ? JSON.parse(storedPublicKeys) : []) as PublicKey[]
  );

  const storedValidatorArray = localStorage.getItem("validatorArray");
  const [validatorArray, setValidatorArray] = useState(
    (storedValidatorArray ? JSON.parse(storedValidatorArray) : []) as string[]
  );

  const [activeValidators, setActiveValidators] = useState({} as ValidatorMap);
  const [pendingValidators, setPendingValidators] = useState(
    {} as ValidatorMap
  );
  const [validatorsLuck, setValidatorsLuck] = useState({} as ValidatorsLuck);

  const [validatorsPerformance, setValidatorsPerformance] = useState(
    {} as ValidatorsPerformance
  );

  const [validatorsWithdrawals, setValidatorsWithdrawals] = useState(
    {} as ValidatorsWithdrawals[]
  );

  const [balanceNeedsUpdate, setBalanceNeedsUpdate] = useState(true);
  const [luckNeedsUpdate, setLuckNeedsUpdate] = useState(true);
  const [performanceNeedsUpdate, setPerformanceNeedsUpdate] = useState(true);
  const [withdrawalsNeedsUpdate, setWithdrawalsNeedsUpdate] = useState(true);

  const [stakedLYX, setStakedLYX] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [networkValidators, setNetworkValidators] = useState(0);

  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);

  // Fetch validators and filter them based on withdrawal address
  useEffect(() => {
    if (validatorArray.length === 0) {
      const fetchedData = fetchValidators(publicKeys);

      fetchedData.then((data) => setValidatorArray(data));
    }
  }, [validatorArray.length, publicKeys, setValidatorArray]);

  // Save validators to local storage
  useEffect(() => {
    localStorage.setItem("validatorArray", JSON.stringify(validatorArray));
  }, [validatorArray]);

  // Fetch validators count and staked LYX count
  useEffect(() => {
    if (stakedLYX === 0 || networkValidators === 0 || currentEpoch === 0) {
      const fetchedData = getLastEpoch();

      fetchedData.then((epoch) => {
        setStakedLYX(epoch.totalvalidatorbalance);
        setCurrentEpoch(epoch.epoch);
        setNetworkValidators(epoch.validatorscount);
      });
    }
  });

  // Update validators balance
  useEffect(() => {
    if (balanceNeedsUpdate) {
      const fetchedData = fetchValidatorsBalance(validatorArray);

      fetchedData.then((data) => {
        setActiveValidators(data.activeValidators);
        setPendingValidators(data.pendingValidators);
      });
      setBalanceNeedsUpdate(false);
    }
  }, [validatorArray, balanceNeedsUpdate, setBalanceNeedsUpdate]);

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
  }, [activeValidators, luckNeedsUpdate, validatorsLuck, setValidatorsLuck]);

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
  }, [performanceNeedsUpdate, activeValidators]);

  // Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (!eurPrice || !usdPrice) {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=lukso-token-2&vs_currencies=eur%2Cusd"
      )
        .then((res) => res.json())
        .then((data) => {
          setEurPrce(data["lukso-token-2"].eur);
          setUsdPrce(data["lukso-token-2"].usd);
        });
    }
  });

  // Fetch withdrawals
  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      withdrawalsNeedsUpdate
    ) {
      let fetchedData = fetchValidatorsWithdrawals(activeValidators);

      fetchedData.then((data) => setValidatorsWithdrawals(data));
      setWithdrawalsNeedsUpdate(false);
    }
  }, [activeValidators, withdrawalsNeedsUpdate]);

  const tileStyle =
    "flex items-center justify-center space-x-4 text-center bg-slate-100 rounded-2xl shadow-md p-5 m-2";
  const titleStyle = "text-xl font-bold";

  return (
    <div className="container max-w-6xl px-5 mx-auto my-28">
      <div className="grid sm:grid-cols-1 lg:grid-cols-3">
        <div className={`${tileStyle} flex-col bg-opacity-40`}>
          <p className={titleStyle}>Active Validators</p>
          <p>{networkValidators.toLocaleString()}</p>
        </div>
        <div className={`${tileStyle} flex-col bg-opacity-40`}>
          <p className={titleStyle}>Staked LYX</p>
          <p className=" text-">
            {Math.round(stakedLYX / 1e9).toLocaleString()}
          </p>
        </div>
        <div className={`${tileStyle} flex-col bg-opacity-40`}>
          <p className={titleStyle}>Current epoch</p>
          <p className=" text-">{currentEpoch.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        <LYXPrice
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          eurPrice={eurPrice ? eurPrice : ""}
          usdPrice={usdPrice ? usdPrice : ""}
        />
        <Earnings
          timeframe="weekly"
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          eurPrice={eurPrice ? eurPrice : ""}
          usdPrice={usdPrice ? usdPrice : ""}
          validatorsPerformance={validatorsPerformance}
        />
        <Earnings
          timeframe="monthly"
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          eurPrice={eurPrice ? eurPrice : ""}
          usdPrice={usdPrice ? usdPrice : ""}
          validatorsPerformance={validatorsPerformance}
        />
        <Earnings
          timeframe="total"
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          eurPrice={eurPrice ? eurPrice : ""}
          usdPrice={usdPrice ? usdPrice : ""}
          validatorsPerformance={validatorsPerformance}
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        <APYRate
          timeframe="annual"
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          stakedLYX={stakedLYX}
        />
        <APYRate
          timeframe="monthly"
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          stakedLYX={stakedLYX}
        />
        <Performance
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          validatorsPerformance={validatorsPerformance}
        />
        <Luck
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          validatorsLuck={validatorsLuck}
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        <Validators
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          activeValidators={activeValidators}
          pendingValidators={pendingValidators}
        />
        <Balance
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          activeValidators={activeValidators}
          pendingValidators={pendingValidators}
        />
        <Withdrawals
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          validatorsWithdrawals={validatorsWithdrawals}
        />
        <WithdrawalBalance
          tileStyle={`${tileStyle} bg-opacity-60`}
          titleStyle={titleStyle}
          publicKeys={publicKeys}
          eurPrice={eurPrice ? eurPrice : ""}
          usdPrice={usdPrice ? usdPrice : ""}
        />
      </div>
    </div>
  );
};
