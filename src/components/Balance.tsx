import balance from "../assets/balance.png";

export const Balance = ({
  tileStyle,
  titleStyle,
  activeValidatorsBalance,
  pendingValidatorsBalance,
}: {
  tileStyle: string;
  titleStyle: string;
  activeValidatorsBalance: number;
  pendingValidatorsBalance: number;
}) => {
  return (
    <div className={tileStyle}>
      <img src={balance} className="w-10 h-10" alt="balance" />
      <div>
        <p className={titleStyle}>Validator balance</p>
        <p className="text-green-600 font-bold">
          {activeValidatorsBalance
            ? `Active: ${(activeValidatorsBalance / 1e9).toFixed(2)} LYX`
            : ""}
        </p>
        <p className="text-red-600 font-bold">
          {pendingValidatorsBalance
            ? `Pending: ${(pendingValidatorsBalance / 1e9).toFixed(2)} LYX`
            : ""}
        </p>
      </div>
    </div>
  );
};
