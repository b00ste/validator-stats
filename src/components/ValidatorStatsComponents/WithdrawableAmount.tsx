import { WithdrawableAmountParams } from "../../Types/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const WithdrawableAmount = ({
  tileClasses,
  tokenPrice,
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
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={
          activeBalance / 1e9 -
          Object.getOwnPropertyNames(activeValidators).length * 32
        }
      />
    </div>
  );
};
