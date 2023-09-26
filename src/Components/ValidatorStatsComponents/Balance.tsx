import { BalanceParams } from "../../Types/ComponentParamsTypes";
import { DisplayTokenPrice } from "../DisplayTokenPrice";

export const Balance = ({
  tileClasses,
  tokenPrice,
  validatorsBalances: {
    activeBalance,
    pendingBalance,
    offlineBalance,
    slashedBalance,
    otherBalance,
  },
}: BalanceParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validator Balance</div>
      <p className="text-slate-gray font-bold">
        Active:
        <span className="text-pastel-green">{` ${(
          activeBalance / 1e9
        ).toLocaleString()} LYX`}</span>
      </p>
      {pendingBalance > 0 ? (
        <p className="text-slate-gray font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${(
            pendingBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      {offlineBalance > 0 ? (
        <p className="text-slate-gray font-bold">
          Offline:
          <span className="text-pastel-red">{` ${(
            offlineBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      {slashedBalance > 0 ? (
        <p className="text-slate-gray font-bold">
          Slashed:
          <span className="text-pastel-red">{` ${(
            slashedBalance / 1e9
          ).toLocaleString()} LYX`}</span>
        </p>
      ) : (
        <></>
      )}
      {otherBalance > 0 ? (
        <p className="text-slate-gray font-bold">
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
