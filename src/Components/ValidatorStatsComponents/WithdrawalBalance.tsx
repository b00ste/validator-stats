import { Fragment, useEffect, useState } from 'react';

// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// types
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

interface Props {
  selectedGroup: WithdrawalAddressesGroup;
  withdrawalAddressesBalance: Record<string, number>;
}

export const WithdrawalBalance: React.FC<Props> = ({
  selectedGroup,
  withdrawalAddressesBalance,
}) => {
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (Object.getOwnPropertyNames(withdrawalAddressesBalance).length > 0) {
      let newTotalBalance = 0;

      for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
        const withdrawalAddress = selectedGroup.withdrawalAddresses[i].address;
        newTotalBalance += withdrawalAddressesBalance[withdrawalAddress];
      }

      setTotalBalance(newTotalBalance);
    }
  }, [selectedGroup, withdrawalAddressesBalance]);

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Withdrawal Balance
          </h2>
          {selectedGroup.withdrawalAddresses.map((withdrawalAddress) =>
            withdrawalAddressesBalance[withdrawalAddress.address] ? (
              <Fragment key={withdrawalAddress.address}>
                <div className="grid grid-cols-2 w-full">
                  <p className="paragraph-inter-14-medium col-span-1 text-left ml-4">
                    {`${withdrawalAddress.name}:`}
                  </p>
                  <p className="paragraph-inter-14-medium col-span-1 text-right mr-4">
                    {`${withdrawalAddressesBalance[
                      withdrawalAddress.address
                    ].toLocaleString()} LYX`}
                  </p>
                </div>
              </Fragment>
            ) : (
              <Fragment key={withdrawalAddress.address}></Fragment>
            ),
          )}
          <div className="grid grid-cols-2 w-full">
            <p className="paragraph-inter-14-medium col-span-1 text-left ml-4">
              Total:
            </p>
            <p className="paragraph-inter-14-medium col-span-1 text-right mr-4">
              {`${totalBalance.toLocaleString()} LYX`}
            </p>
          </div>
          <DisplayTokenPrice tokenAmount={totalBalance} />
        </div>
      </lukso-card>
    </div>
  );
};
