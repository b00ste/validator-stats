import { WithdrawalBalanceParams } from "../../Types/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const WithdrawalBalance = ({
  tileClasses,
  tokenPrice,
  withdrawalAddressesBalance,
}: WithdrawalBalanceParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawal Balance</div>
      <p className="text-gray-600 font-bold">
        {`${withdrawalAddressesBalance.toLocaleString()} LYX`}
      </p>
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={withdrawalAddressesBalance}
      />
    </div>
  );
};
