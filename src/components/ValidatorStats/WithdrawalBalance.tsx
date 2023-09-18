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
        {`${withdrawalAddressesBalance.toLocaleString()} LYX`}
      </p>
      <div className="container mx-auto grid grid-cols-2">
        <div className="border-dark-pink col-span-2 border-b my-2 mx-4" />
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            withdrawalAddressesBalance * Number.parseFloat(eurPrice)
          ).toLocaleString()} €`}
        </p>
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            withdrawalAddressesBalance * Number.parseFloat(usdPrice)
          ).toLocaleString()} $`}
        </p>
      </div>
    </div>
  );
};
