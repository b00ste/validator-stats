import { WithdrawableAmountParams } from "../../typings/types";

export const WithdrawableAmount = ({
  tileClasses,
  eurPrice,
  usdPrice,
  activeValidators,
  activeBalance,
}: WithdrawableAmountParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawable Amount</div>
      <p className="text-gray-600 font-bold">
        {`${(
          activeBalance / 1e9 -
          Object.getOwnPropertyNames(activeValidators).length * 32
        ).toLocaleString()} LYX`}
      </p>
      <div className="container mx-auto grid grid-cols-2">
        <div className="border-dark-pink col-span-2 border-b my-2 mx-4" />
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            (activeBalance / 1e9 -
              Object.getOwnPropertyNames(activeValidators).length * 32) *
            Number.parseFloat(eurPrice)
          ).toLocaleString()} €`}
        </p>
        <p className="text-dark-pink font-bold text-sm">
          {`${(
            (activeBalance / 1e9 -
              Object.getOwnPropertyNames(activeValidators).length * 32) *
            Number.parseFloat(usdPrice)
          ).toLocaleString()} $`}
        </p>
      </div>
    </div>
  );
};
