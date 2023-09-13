import { useEffect, useState } from "react";
import withdrawal_balance from "./assets/withdrawal_balance.png";
import withdrawal from "./assets/withdrawal.png";

import { Performance } from "./components/Performance";
import { Earnings } from "./components/Earnings";
import { LYXPrice } from "./components/LYXPrice";
import { APYRate } from "./components/APYRate";
import { Luck } from "./components/Luck";

import { Validator, ValidatorList } from "./typings/types";
import { Validators } from "./components/Validators";
import { Balance } from "./components/Balance";

const beacon_chain_1 = "http://beacon-chain.teku-lukso.dappnode:3500";
const consensys_explorer = "https://explorer.consensus.mainnet.lukso.network";
const withdrawal_safes = [
  "0x8D05A410bde138D9Cdd013716a483F3A3faF8961".toLowerCase(),
  "0xf5deA1bD8FE5401C88C260376Ec231aA57dCE8b9".toLowerCase(),
  "0xcbE2D1C578E0A332a2d28497e5D33189da2a061A".toLowerCase(),
  "0x223b858E0A5f9B071538d06fabE23aF42e87CE2e".toLowerCase(),
  "0xdAA7a53F192296E33f91C1064581c626E9553AF3".toLowerCase(),
];
const depositoors = [
  "0x0000000BF90389c94230b5122269f6fF2F3e5b95",
  "0x523f5E8a3CF46D701e11834EeA79F762378ab5C4",
  "0x7b650deE2Ef651494Ee14076f4E909A38831B350",
  "0x000000583664F04bcFb3E4c72A651f2961550131",
  "0x4a14c4Fe80Aa55FEb98e1BBc1Ab71E06D0965F1D",
  "0x47872c4fbf0eaEBa93Fc5953975bB779dA070D80",
];

function App() {
  const [validatorList, setValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [activeValidatorList, setActiveValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [activeValidatorMap, setActiveValidatorMap] = useState(
    {} as Record<string, Validator>
  );
  const [pendingValidatorList, setPendingValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [validatorsCount, setValidatorsCount] = useState(
    undefined as number | undefined
  );
  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);
  const [stakedLYX, setStakedLYX] = useState(undefined as number | undefined);
  const [activeValidatorsBalance, setActiveValidatorsBalance] = useState(
    undefined as number | undefined
  );
  const [pendingValidatorsBalance, setPendingValidatorsBalance] = useState(
    undefined as number | undefined
  );

  const getValue = (validators: Validator[]) => {
    let value = 0;
    validators.forEach((elem) => (value += Number(elem.balance)));
    return value;
  };

  // Fetch validators and filter them based on withdrawal address
  useEffect(() => {
    if (!validatorList) {
      fetch(`${beacon_chain_1}/eth/v1/beacon/states/head/validators`)
        .then((res) => res.json())
        .then((data: ValidatorList) => {
          setValidatorsCount(
            data.data.filter((value) => value.status === "active_ongoing")
              .length
          );
          setStakedLYX(
            getValue(
              data.data.filter((value) => value.status === "active_ongoing")
            )
          );
          setValidatorList(
            data.data.filter((value) =>
              withdrawal_safes.includes(
                `0x${value.validator.withdrawal_credentials.substring(26)}`
              )
            )
          );
        });
    }
  });

  // Compute active validator list and active validator balance
  useEffect(() => {
    if (validatorList) {
      if (!activeValidatorList) {
        setActiveValidatorList(
          validatorList.filter((value) => {
            if (value.status === "active_ongoing") {
              // setActiveValidatorMap({...activeValidatorMap, `${value.index}`: value });
              setActiveValidatorMap({
                ...activeValidatorMap,
                [value.index]: value,
              });
              return true;
            }
            return false;
          })
        );
      } else {
        if (!activeValidatorsBalance) {
          setActiveValidatorsBalance(getValue(activeValidatorList));
        }
      }
    }
  }, [
    validatorList,
    activeValidatorList,
    activeValidatorMap,
    activeValidatorsBalance,
    setActiveValidatorList,
  ]);

  // Compute pending validator list and pending validator balance
  useEffect(() => {
    if (validatorList) {
      if (!pendingValidatorList) {
        setPendingValidatorList(
          validatorList.filter((value) => value.status === "pending_queued")
        );
      } else {
        if (!pendingValidatorsBalance) {
          setPendingValidatorsBalance(getValue(pendingValidatorList));
        }
      }
    }
  }, [
    validatorList,
    pendingValidatorList,
    pendingValidatorsBalance,
    setPendingValidatorsBalance,
  ]);

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

  // if (validatorList) {
  //   fetch(
  //     `${consensys_explorer}/api/v1/validator/eth1/${depositoors[5]}?limit=98`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }
  // if (validatorList) {
  //   fetch(
  //     `${consensys_explorer}/api/v1/validator/withdrawalCredentials/${withdrawal_safes[0]}?limit=99`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }

  const tileStyle =
    "flex items-center justify-center space-x-4 text-center bg-slate-100 rounded-2xl shadow-md p-5 m-2";
  const titleStyle = "text-xl font-bold";

  return (
    <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
      <div className="container max-w-6xl px-5 mx-auto my-28">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2">
          <div className={`${tileStyle} flex-col bg-opacity-40`}>
            <p className={titleStyle}>Active Validators</p>
            <p>{Number(validatorsCount).toLocaleString()}</p>
          </div>
          <div className={`${tileStyle} flex-col bg-opacity-40`}>
            <p className={titleStyle}>Staked LYX</p>
            <p className=" text-">
              {(stakedLYX ? Math.round(stakedLYX / 1e9) : 0).toLocaleString()}
            </p>
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
            activeValidatorList={activeValidatorList ? activeValidatorList : []}
            activeValidatorsBalance={
              activeValidatorsBalance ? activeValidatorsBalance : 0
            }
          />
          <Earnings
            timeframe="monthly"
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            eurPrice={eurPrice ? eurPrice : ""}
            usdPrice={usdPrice ? usdPrice : ""}
            activeValidatorList={activeValidatorList ? activeValidatorList : []}
            activeValidatorsBalance={
              activeValidatorsBalance ? activeValidatorsBalance : 0
            }
          />
          <Earnings
            timeframe="total"
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            eurPrice={eurPrice ? eurPrice : ""}
            usdPrice={usdPrice ? usdPrice : ""}
            activeValidatorList={activeValidatorList ? activeValidatorList : []}
            activeValidatorsBalance={
              activeValidatorsBalance ? activeValidatorsBalance : 0
            }
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <APYRate
            timeframe="annual"
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            stakedLYX={stakedLYX ? stakedLYX : 0}
          />
          <APYRate
            timeframe="monthly"
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            stakedLYX={stakedLYX ? stakedLYX : 0}
          />
          <Performance
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
          />
          <Luck
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <Validators
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            activeValidatorList={activeValidatorList ? activeValidatorList : []}
            pendingValidatorList={
              pendingValidatorList ? pendingValidatorList : []
            }
          />
          <Balance
            tileStyle={`${tileStyle} bg-opacity-60`}
            titleStyle={titleStyle}
            activeValidatorsBalance={
              activeValidatorsBalance ? activeValidatorsBalance : 0
            }
            pendingValidatorsBalance={
              pendingValidatorsBalance ? pendingValidatorsBalance : 0
            }
          />
          <div className={`${tileStyle} bg-opacity-60`}>
            <img src={withdrawal} className="w-10 h-10" alt="withdrawal" />
            <div>
              <p className={titleStyle}>Withdrawals</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-60`}>
            <img
              src={withdrawal_balance}
              className="w-10 h-10"
              alt="withdrawal_balance"
            />
            <div>
              <p className={titleStyle}>Withdrawal balance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
