import { useContext, useEffect, useState } from 'react';

// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// types
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

// context
import { ValidatorsDataContext } from '../../App';

interface Props {
  selectedGroup: WithdrawalAddressesGroup;
}

export const TotalWithdrawals: React.FC<Props> = ({ selectedGroup }) => {
  const { activeValidators = {} } = useContext(ValidatorsDataContext);
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
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Total Withdrawals
          </h2>
          <p className="paragraph-inter-14-medium">{`${(
            totalWithdrawals / 1e9
          ).toLocaleString()} LYX`}</p>
          <DisplayTokenPrice tokenAmount={totalWithdrawals / 1e9} />
        </div>
      </lukso-card>
    </div>
  );
};
