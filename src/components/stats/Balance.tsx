import { useEffect, useState } from "react";
import { ValidatorMap } from "../../typings/types";

type BalanceParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
};

export const Balance = ({
  tileClasses,
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
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validator Balance</div>
      <p className="text-pastel-green font-bold">
        {`Active: ${(activeBalance / 1e9).toFixed(2)} LYX`}
      </p>
      <p className="text-pastel-red font-bold">
        {`Pending: ${(pendingBalance / 1e9).toFixed(2)} LYX`}
      </p>
    </div>
  );
};
