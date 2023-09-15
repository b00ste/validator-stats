import { useEffect, useState } from "react";
import { PublicKey } from "../../typings/types";
import { getWithdrawalAddressBalance } from "../../helpers/network";

type WithdrawalBalanceParams = {
  tileClasses: string;
  publicKeys: PublicKey[];
  eurPrice: string;
  usdPrice: string;
};

export const WithdrawalBalance = ({
  tileClasses,
  publicKeys,
  eurPrice,
  usdPrice,
}: WithdrawalBalanceParams) => {
  const [withdrawalAddressesBalance, setWithdrawalAddressesBalance] =
    useState(0);
  const [
    withdrawalAddressesBalanceNeedsUpdate,
    setWithdrawalAddressesBalanceNeedsUpdate,
  ] = useState(true);

  // Fetch withdrawal addrsses balances
  useEffect(() => {
    if (withdrawalAddressesBalanceNeedsUpdate) {
      const fetchedData = getWithdrawalAddressBalance(publicKeys);

      fetchedData.then((data) => setWithdrawalAddressesBalance(data));
      setWithdrawalAddressesBalanceNeedsUpdate(false);
    }
  }, [withdrawalAddressesBalanceNeedsUpdate, publicKeys]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">
        Withdrawal addresses balance
      </div>
      <p className="text-gray-600">
        {`${withdrawalAddressesBalance.toFixed(2)} LYX`}
      </p>
      <p className="text-gray-600">
        {`${(withdrawalAddressesBalance * Number.parseFloat(eurPrice)).toFixed(
          2
        )} €`}
      </p>
      <p className="text-gray-600">
        {`${(withdrawalAddressesBalance * Number.parseFloat(usdPrice)).toFixed(
          2
        )} $`}
      </p>
    </div>
  );
};
