import { useEffect, useState } from "react";
import { WithdrawalsParams } from "../../typings/types";

export const Withdrawals = ({
  tileClasses,
  activeValidators,
  validatorMapsNeedUpdate,
}: WithdrawalsParams) => {
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [totalWithdrawalsNeedsUpdate, setTotalWithdrawalsNeedsUpdate] =
    useState(true);

  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      totalWithdrawalsNeedsUpdate
    ) {
      for (const validatorAddress in activeValidators) {
        const newTotalWithdrawals =
          totalWithdrawals +
          activeValidators[validatorAddress].total_withdrawals;
        setTotalWithdrawals(newTotalWithdrawals);
      }

      setTotalWithdrawalsNeedsUpdate(false);
    }
  }, [activeValidators, totalWithdrawalsNeedsUpdate, totalWithdrawals]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawals</div>
      {validatorMapsNeedUpdate ? (
        <div className="loading-animation" />
      ) : (
        <p className="text-gray-600">{`${totalWithdrawals / 1e9} LYX`}</p>
      )}
    </div>
  );
};
