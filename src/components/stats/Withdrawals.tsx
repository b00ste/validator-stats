import { useEffect, useState } from "react";
import withdrawal from "../../assets/withdrawal.png";
import { ValidatorsWithdrawals } from "../../typings/types";

type WithdrawalsParams = {
  tileStyle: string;
  titleStyle: string;
  validatorsWithdrawals: ValidatorsWithdrawals[];
};

export const Withdrawals = ({
  tileStyle,
  titleStyle,
  validatorsWithdrawals,
}: WithdrawalsParams) => {
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [withdrawalEpoch, setWithdrawalEpoch] = useState(0);
  const [totalWithdrawalsNeedsUpdate, setTotalWithdrawalsNeedsUpdate] =
    useState(true);

  useEffect(() => {
    if (validatorsWithdrawals.length > 0 && totalWithdrawalsNeedsUpdate) {
      for (let i = 0; i < validatorsWithdrawals.length; i++) {
        const newTotalWithdrawals =
          totalWithdrawals + validatorsWithdrawals[i].amount;

        setTotalWithdrawals(newTotalWithdrawals);
        setWithdrawalEpoch(validatorsWithdrawals[i].epoch);
      }

      setTotalWithdrawalsNeedsUpdate(false);
    }
  }, [totalWithdrawalsNeedsUpdate, validatorsWithdrawals, totalWithdrawals]);

  return (
    <div className={`${tileStyle} bg-opacity-60`}>
      <img src={withdrawal} className="w-10 h-10" alt="withdrawal" />
      <div>
        <p className={titleStyle}>Withdrawals</p>
        <p>{`${totalWithdrawals / 1e9} LYX`}</p>
        <p>{`Epoch: ${withdrawalEpoch}`}</p>
      </div>
    </div>
  );
};
