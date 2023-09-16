import { useEffect, useState } from "react";
import { WithdrawalsParams } from "../../typings/types";

export const TotalWithdrawals = ({
  tileClasses,
  activeValidators,
  eurPrice,
  usdPrice,
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
      let newTotalWithdrawals = 0;
      for (const validatorAddress in activeValidators) {
        if (activeValidators[validatorAddress].total_withdrawals) {
          newTotalWithdrawals +=
            activeValidators[validatorAddress].total_withdrawals;
        }
      }
      setTotalWithdrawals(newTotalWithdrawals);

      setTotalWithdrawalsNeedsUpdate(false);
    }
  }, [activeValidators, totalWithdrawalsNeedsUpdate, totalWithdrawals]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Total Withdrawals</div>
      {validatorMapsNeedUpdate ? (
        <div className="loading-animation" />
      ) : (
        <>
          <p className="text-gray-600 font-bold">{`${(
            totalWithdrawals / 1e9
          ).toFixed(2)} LYX`}</p>
          <p className="text-gray-600 font-bold">
            {`${(
              (totalWithdrawals / 1e9) *
              Number.parseFloat(eurPrice)
            ).toFixed(2)} €`}
          </p>
          <p className="text-gray-600 font-bold">
            {`${(
              (totalWithdrawals / 1e9) *
              Number.parseFloat(usdPrice)
            ).toFixed(2)} $`}
          </p>
        </>
      )}
    </div>
  );
};
