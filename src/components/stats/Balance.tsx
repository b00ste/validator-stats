import { useEffect, useState } from "react";
import { BalanceParams } from "../../typings/types";

export const Balance = ({
  tileClasses,
  activeValidators,
  pendingValidators,
  slashedValidators,
  otherValidators,
  validatorMapsNeedUpdate,
}: BalanceParams) => {
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

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validator Balance</div>
      {validatorMapsNeedUpdate ? (
        <div className="loading-animation" />
      ) : (
        <>
          <p className="font-bold">
            Active:
            <span className="text-pastel-green">{` ${(
              activeBalance / 1e9
            ).toFixed(2)} LYX`}</span>
          </p>
          <p className="font-bold">
            Pending:
            <span className="text-pastel-orange">{` ${(
              pendingBalance / 1e9
            ).toFixed(2)} LYX`}</span>
          </p>
          <p className="font-bold">
            Slashed:
            <span className="text-pastel-red">{` ${(
              slashedBalance / 1e9
            ).toFixed(2)} LYX`}</span>
          </p>
          <p className="font-bold">
            Other:
            <span className="text-pastel-red">{` ${(otherBalance / 1e9).toFixed(
              2
            )} LYX`}</span>
          </p>
        </>
      )}
    </div>
  );
};
