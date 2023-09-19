import { BalanceParams } from "../../typings/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const Balance = ({
  tileClasses,
  tokenPrice,
  validatorsBalances: {
    activeBalance,
    pendingBalance,
    slashedBalance,
    otherBalance,
  },
}: BalanceParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validator Balance</div>
      <p className="text-gray-600 font-bold">
        Active:
        <span className="text-pastel-green">{` ${(
          activeBalance / 1e9
        ).toLocaleString()} LYX`}</span>
      </p>
      {pendingBalance > 0 ? (
        <p className="text-gray-600 font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${(
            pendingBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      {slashedBalance > 0 ? (
        <p className="text-gray-600 font-bold">
          Slashed:
          <span className="text-pastel-red">{` ${(
            slashedBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      {otherBalance > 0 ? (
        <p className="text-gray-600 font-bold">
          Other:
          <span className="text-pastel-red">{` ${(
            otherBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={
          (activeBalance + pendingBalance + slashedBalance + otherBalance) / 1e9
        }
      />
    </div>
  );
};
