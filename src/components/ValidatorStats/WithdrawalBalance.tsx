import { WithdrawalBalanceParams } from "../../typings/types";

export const WithdrawalBalance = ({
  tileClasses,
  eurPrice,
  usdPrice,
  withdrawalAddressesBalance,
}: WithdrawalBalanceParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawal Balance</div>
      <p className="text-gray-600 font-bold">
        {`${withdrawalAddressesBalance.toFixed(2)} LYX`}
      </p>
      <p className="text-gray-600 font-bold">
        {`${(withdrawalAddressesBalance * Number.parseFloat(eurPrice)).toFixed(
          2
        )} €`}
      </p>
      <p className="text-gray-600 font-bold">
        {`${(withdrawalAddressesBalance * Number.parseFloat(usdPrice)).toFixed(
          2
        )} $`}
      </p>
    </div>
  );
};
