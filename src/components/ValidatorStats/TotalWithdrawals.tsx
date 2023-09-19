import { useEffect, useState } from "react";

// types
import { WithdrawalsParams } from "../../typings/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const TotalWithdrawals = ({
  tileClasses,
  activeValidators,
  tokenPrice,
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
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={totalWithdrawals / 1e9}
      />
    </div>
  );
};
