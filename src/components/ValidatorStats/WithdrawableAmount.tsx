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
        ).toFixed(2)} LYX`}
      </p>
      <p className="text-gray-600 font-bold">
        {`${(
          (activeBalance / 1e9 -
            Object.getOwnPropertyNames(activeValidators).length * 32) *
          Number.parseFloat(eurPrice)
        ).toFixed(2)} €`}
      </p>
      <p className="text-gray-600 font-bold">
        {`${(
          (activeBalance / 1e9 -
            Object.getOwnPropertyNames(activeValidators).length * 32) *
          Number.parseFloat(usdPrice)
        ).toFixed(2)} $`}
      </p>
    </div>
  );
};
