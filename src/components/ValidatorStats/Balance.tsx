import { BalanceParams } from "../../typings/types";

export const Balance = ({
  tileClasses,
  activeBalance,
  pendingBalance,
  slashedBalance,
  otherBalance,
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
      <p className="text-gray-600 font-bold">
        Pending:
        <span className="text-pastel-orange">{` ${(
          pendingBalance / 1e9
        ).toLocaleString()} LYX`}</span>
      </p>
      <p className="text-gray-600 font-bold">
        Slashed:
        <span className="text-pastel-red">{` ${(
          slashedBalance / 1e9
        ).toLocaleString()} LYX`}</span>
      </p>
      <p className="text-gray-600 font-bold">
        Other:
        <span className="text-pastel-red">{` ${(
          otherBalance / 1e9
        ).toLocaleString()} LYX`}</span>
      </p>
    </div>
  );
};
