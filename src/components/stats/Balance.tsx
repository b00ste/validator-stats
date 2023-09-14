import { useEffect, useState } from "react";
import balance from "../../assets/balance.png";
import { ValidatorMap } from "../../typings/types";

type BalanceParams = {
  tileStyle: string;
  titleStyle: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
};

export const Balance = ({
  tileStyle,
  titleStyle,
  activeValidators,
  pendingValidators,
}: BalanceParams) => {
  const [activeBalance, setActiveBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);

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
  }, [activeValidators, pendingValidators]);

  return (
    <div className={tileStyle}>
      <img src={balance} className="w-10 h-10" alt="balance" />
      <div>
        <p className={titleStyle}>Validator balance</p>
        <p className="text-green-600 font-bold">
          {`Active: ${(activeBalance / 1e9).toFixed(2)} LYX`}
        </p>
        <p className="text-red-600 font-bold">
          {`Pending: ${(pendingBalance / 1e9).toFixed(2)} LYX`}
        </p>
      </div>
    </div>
  );
};
