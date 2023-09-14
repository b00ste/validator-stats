import { useEffect, useState } from "react";
import withdrawal_balance from "../../assets/withdrawal_balance.png";
import { PublicKey } from "../../typings/types";
import { getWithdrawalAddressBalance } from "../../helpers/network";

type WithdrawalBalanceParams = {
  tileStyle: string;
  titleStyle: string;
  publicKeys: PublicKey[];
  eurPrice: string;
  usdPrice: string;
};

export const WithdrawalBalance = ({
  tileStyle,
  titleStyle,
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
    <div className={`${tileStyle} bg-opacity-60`}>
      <img
        src={withdrawal_balance}
        className="w-10 h-10"
        alt="withdrawal_balance"
      />
      <div>
        <p className={titleStyle}>Withdrawal addresses balance</p>
        <p>{`${withdrawalAddressesBalance.toFixed(2)} LYX`}</p>
        <p>{`${(
          withdrawalAddressesBalance * Number.parseFloat(eurPrice)
        ).toFixed(2)} €`}</p>
        <p>{`${(
          withdrawalAddressesBalance * Number.parseFloat(usdPrice)
        ).toFixed(2)} $`}</p>
      </div>
    </div>
  );
};
