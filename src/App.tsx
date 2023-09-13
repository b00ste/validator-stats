import { useEffect, useState } from "react";
import balance from "./assets/balance.png";
import earnings from "./assets/earnings.png";
import luck from "./assets/luck.png";
import performance from "./assets/performance.png";
import token_price from "./assets/token_price.png";
import validators from "./assets/validators.png";
import withdrawal_balance from "./assets/withdrawal_balance.png";
import withdrawal from "./assets/withdrawal.png";
import percentage_yield from "./assets/percentage_yield.png";
import "./App.css";

// const beacon_chain_0 = "http://172.33.0.6:3500";
const beacon_chain_1 = "http://beacon-chain.teku-lukso.dappnode:3500";
const withdrawal_safes = [
  "0x8D05A410bde138D9Cdd013716a483F3A3faF8961".toLowerCase(),
  "0xf5deA1bD8FE5401C88C260376Ec231aA57dCE8b9".toLowerCase(),
  "0xcbE2D1C578E0A332a2d28497e5D33189da2a061A".toLowerCase(),
  "0x223b858E0A5f9B071538d06fabE23aF42e87CE2e".toLowerCase(),
  "0xdAA7a53F192296E33f91C1064581c626E9553AF3".toLowerCase(),
];

type Validator = {
  balance: string;
  index: string;
  status: string;
  validator: {
    activation_eligibility_epoch: string;
    activation_epoch: string;
    effective_balance: string;
    exit_epoch: string;
    pubkey: string;
    slashed: boolean;
    withdrawable_epoch: string;
    withdrawal_credentials: string;
  };
};

type ValidatorList = {
  data: Validator[];
  execution_optimistic: boolean;
  finalized: boolean;
};

function App() {
  const [validatorList, setValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [activeValidatorList, setActiveValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [pendingValidatorList, setPendingValidatorList] = useState(
    undefined as Validator[] | undefined
  );
  const [validatorsCount, setValidatorsCount] = useState(
    undefined as number | undefined
  );
  const [stakedLYX, setStakedLYX] = useState(undefined as number | undefined);
  const [LYXPrice, setLYXPrce] = useState({ eur: "", usd: "" });
  const [activeValidatorsBalance, setActiveValidatorsBalance] = useState(
    undefined as number | undefined
  );
  const [pendingValidatorsBalance, setPendingValidatorsBalance] = useState(
    undefined as number | undefined
  );

  const getValue = (validators: Validator[]) => {
    let value = 0;
    validators.forEach((elem) => (value += Number(elem.balance)));
    return Number.parseFloat((value / 1000000000).toFixed(4));
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
          validatorList.filter((value) => value.status === "active_ongoing")
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
    if (!LYXPrice.eur || !LYXPrice.usd) {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=lukso-token-2&vs_currencies=eur%2Cusd"
      )
        .then((res) => res.json())
        .then((data) => {
          setLYXPrce(data["lukso-token-2"]);
        });
    }
  });

  const getAnualRate = () => {
    const EPOCHS_PER_YEAR = 82180;

    return (
      (EPOCHS_PER_YEAR * 512) / Math.sqrt(stakedLYX ? Math.round(stakedLYX) : 0)
    );
  };

  const tileStyle =
    "flex items-center justify-center space-x-4 text-center bg-slate-100 rounded-2xl shadow-md p-5 m-2";
  const titleStyle = "text-xl font-bold";

  return (
    <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
      <div className="container max-w-6xl px-5 mx-auto my-28">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2">
          <div className={`${tileStyle} flex-col bg-opacity-20`}>
            <p className={titleStyle}>Active Validators</p>
            <p>{validatorsCount}</p>
          </div>
          <div className={`${tileStyle} flex-col bg-opacity-20`}>
            <p className={titleStyle}>Staked LYX</p>
            <p>{stakedLYX ? Math.round(stakedLYX) : 0}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${tileStyle} bg-opacity-40`}>
            <img src={token_price} className="w-10 h-10" alt="token_price" />
            <div>
              <p className={titleStyle}>LYX price</p>
              <p>{`${LYXPrice.eur} €`}</p>
              <p>{`${LYXPrice.usd} $`}</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-60`}>
            <img src={earnings} className="w-10 h-10" alt="earnings" />
            <div>
              <p className={titleStyle}>Weekly earnings</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-40`}>
            <img src={earnings} className="w-10 h-10" alt="earnings" />
            <div>
              <p className={titleStyle}>Monthly earnings</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-60`}>
            <img src={earnings} className="w-10 h-10" alt="earnings" />
            <div>
              <p className={titleStyle}>Total earnings</p>
              <p id="total_earnings_lyx">
                {`${
                  activeValidatorsBalance && activeValidatorList
                    ? (
                        activeValidatorsBalance -
                        32 * activeValidatorList.length
                      ).toFixed(4)
                    : 0
                } LYX`}
              </p>
              <p id="total_earnings_eur">{`${
                activeValidatorsBalance && activeValidatorList
                  ? (
                      Number.parseFloat(
                        (
                          activeValidatorsBalance -
                          32 * activeValidatorList.length
                        ).toFixed(4)
                      ) * Number.parseFloat(LYXPrice.eur)
                    ).toFixed(4)
                  : 0
              } EUR`}</p>
              <p id="total_earnings_usd">{`${
                activeValidatorsBalance && activeValidatorList
                  ? (
                      Number.parseFloat(
                        (
                          activeValidatorsBalance -
                          32 * activeValidatorList.length
                        ).toFixed(4)
                      ) * Number.parseFloat(LYXPrice.usd)
                    ).toFixed(4)
                  : 0
              } USD`}</p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${tileStyle} bg-opacity-60`}>
            <img
              src={percentage_yield}
              className="w-10 h-10"
              alt="percentage_yield"
            />
            <div>
              <p className={titleStyle}>Annual rate</p>
              <p>{getAnualRate()}</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-40`}>
            <img
              src={percentage_yield}
              className="w-10 h-10"
              alt="percentage_yield"
            />
            <div>
              <p className={titleStyle}>Monthly rate</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-60`}>
            <img src={performance} className="w-10 h-10" alt="performance" />
            <div>
              <p className={titleStyle}>Performance</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-40`}>
            <img src={luck} className="w-10 h-10" alt="luck" />
            <div>
              <p className={titleStyle}>Luck</p>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          <div className={`${tileStyle} bg-opacity-40`}>
            <img src={validators} className="w-10 h-10" alt="validators" />
            <div>
              <p className={titleStyle}>Validators</p>
              <p>{`Active: ${activeValidatorList?.length}`}</p>
              <p>{`Pending: ${pendingValidatorList?.length}`}</p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-60`}>
            <img src={balance} className="w-10 h-10" alt="balance" />
            <div>
              <p className={titleStyle}>Validator balance</p>
              <p id="active_validators_balance">
                {activeValidatorList
                  ? `Active: ${activeValidatorsBalance} LYX`
                  : ""}
              </p>
              <p id="pending_validators_balance">
                {pendingValidatorList
                  ? `Pending: ${pendingValidatorsBalance} LYX`
                  : ""}
              </p>
            </div>
          </div>
          <div className={`${tileStyle} bg-opacity-40`}>
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
