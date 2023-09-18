import { useEffect, useState } from "react";
import { WithdrawalsParams } from "../../typings/types";

export const TotalWithdrawals = ({
  tileClasses,
  activeValidators,
  eurPrice,
  usdPrice,
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
      <p className="text-gray-600 font-bold">{`${(
        totalWithdrawals / 1e9
      ).toLocaleString()} LYX`}</p>
      <div className="container mx-auto grid grid-cols-2">
        <div className="border-dark-pink col-span-2 border-b my-2 mx-4" />
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            (totalWithdrawals / 1e9) *
            Number.parseFloat(eurPrice)
          ).toLocaleString()} €`}
        </p>
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            (totalWithdrawals / 1e9) *
            Number.parseFloat(usdPrice)
          ).toLocaleString()} $`}
        </p>
      </div>
    </div>
  );
};
