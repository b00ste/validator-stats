import { useEffect, useState } from 'react';

// types
import { WithdrawalsParams } from '../../Types/ComponentParamsTypes';
import { DisplayTokenPrice } from '../DisplayTokenPrice';

export const TotalWithdrawals = ({
  tileClasses,
  selectedGroup,
  activeValidators,
  tokenPrice,
}: WithdrawalsParams) => {
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);

  useEffect(() => {
    if (Object.getOwnPropertyNames(activeValidators).length > 0) {
      let newTotalWithdrawals = 0;

      for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
        const withdrawalAddresses =
          selectedGroup.withdrawalAddresses[i].address;
        for (const validatorAddress in activeValidators[withdrawalAddresses]) {
          if (
            activeValidators[withdrawalAddresses][validatorAddress]
              .total_withdrawals
          ) {
            newTotalWithdrawals +=
              activeValidators[withdrawalAddresses][validatorAddress]
                .total_withdrawals;
          }
        }
      }

      setTotalWithdrawals(newTotalWithdrawals);
    }
  }, [selectedGroup, activeValidators]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Total Withdrawals</div>
      <p className="text-slate-gray font-bold">{`${(
        totalWithdrawals / 1e9
      ).toLocaleString()} LYX`}</p>
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={totalWithdrawals / 1e9}
      />
    </div>
  );
};
