import { useEffect, useState } from "react";
import withdrawal from "../../assets/withdrawal.png";
import { ValidatorMap } from "../../typings/types";

type WithdrawalsParams = {
  tileStyle: string;
  titleStyle: string;
  activeValidators: ValidatorMap;
};

export const Withdrawals = ({
  tileStyle,
  titleStyle,
  activeValidators,
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
    <div className={`${tileStyle} bg-opacity-60`}>
      <img src={withdrawal} className="w-10 h-10" alt="withdrawal" />
      <div>
        <p className={titleStyle}>Withdrawals</p>
        <p>{`${totalWithdrawals / 1e9} LYX`}</p>
      </div>
    </div>
  );
};
