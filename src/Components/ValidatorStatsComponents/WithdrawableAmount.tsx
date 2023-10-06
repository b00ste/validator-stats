import { useEffect, useState } from 'react';
import { WithdrawableAmountParams } from '../../Types/ComponentParamsTypes';
import { DisplayTokenPrice } from '../DisplayTokenPrice';

export const WithdrawableAmount = ({
  tileClasses,
  tokenPrice,
  validatorsCount: {
    activeValidatorsCount,
    pendingValidatorsCount,
    offlineValidatorsCount,
    slashedValidatorsCount,
    otherValidatorsCount,
  },
  validatorsBalances: {
    activeBalance,
    pendingBalance,
    offlineBalance,
    slashedBalance,
    otherBalance,
  },
}: WithdrawableAmountParams) => {
  const [withdrawableAmount, setWithdrawableAmount] = useState(0);

  useEffect(() => {
    const totalValidatorsBalance =
      (activeBalance +
        pendingBalance +
        offlineBalance +
        slashedBalance +
        otherBalance) /
      1e9;

    const totalValidatorsCount =
      activeValidatorsCount +
      pendingValidatorsCount +
      offlineValidatorsCount +
      slashedValidatorsCount +
      otherValidatorsCount;

    const newWithdrawableAmount =
      totalValidatorsBalance - totalValidatorsCount * 32;

    setWithdrawableAmount(newWithdrawableAmount);
  }, [
    activeBalance,
    pendingBalance,
    offlineBalance,
    slashedBalance,
    otherBalance,
    activeValidatorsCount,
    pendingValidatorsCount,
    offlineValidatorsCount,
    slashedValidatorsCount,
    otherValidatorsCount,
  ]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawable Amount</div>
      <p className="text-slate-gray font-bold">
        {`${withdrawableAmount.toLocaleString()} LYX`}
      </p>
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={withdrawableAmount}
      />
    </div>
  );
};
