import { useEffect, useState } from "react";
import { WithdrawalBalanceParams } from "../../Types/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const WithdrawalBalance = ({
  tileClasses,
  tokenPrice,
  selectedGroup,
  withdrawalAddressesBalance,
}: WithdrawalBalanceParams) => {
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
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawal Balance</div>
      {selectedGroup.withdrawalAddresses.map((withdrawalAddress) =>
        withdrawalAddressesBalance[withdrawalAddress.address] ? (
          <div className="grid grid-cols-2 w-full">
            <p className="text-slate-gray font-bold col-span-1 text-left ml-4">
              {`${withdrawalAddress.name}:`}
            </p>
            <p className="text-slate-gray font-bold col-span-1 text-right mr-4">
              {`${withdrawalAddressesBalance[
                withdrawalAddress.address
              ].toLocaleString()} LYX`}
            </p>
          </div>
        ) : (
          <></>
        )
      )}
      <div className="grid grid-cols-2 w-full">
        <p className="text-slate-gray font-bold col-span-1 text-left ml-4">
          Total:
        </p>
        <p className="text-slate-gray font-bold col-span-1 text-right mr-4">
          {`${totalBalance.toLocaleString()} LYX`}
        </p>
      </div>
      <DisplayTokenPrice tokenPrice={tokenPrice} tokenAmount={totalBalance} />
    </div>
  );
};
