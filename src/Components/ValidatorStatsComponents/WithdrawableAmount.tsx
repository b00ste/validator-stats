import { useEffect, useState } from 'react';

// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// types
import { ValidatorsBalances, ValidatorsCount } from '../../Types/UsedDataTypes';

interface Props {
  validatorsCount: ValidatorsCount;
  validatorsBalances: ValidatorsBalances;
}

export const WithdrawableAmount: React.FC<Props> = ({
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
}) => {
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
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Withdrawable Amount
          </h2>
          <p className="paragraph-inter-14-medium">
            {`${withdrawableAmount.toLocaleString()} LYX`}
          </p>
          <DisplayTokenPrice tokenAmount={withdrawableAmount} />
        </div>
      </lukso-card>
    </div>
  );
};
