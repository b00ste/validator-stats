import { WithdrawableAmountParams } from '../../Types/ComponentParamsTypes';
import { DisplayTokenPrice } from '../DisplayTokenPrice';

export const WithdrawableAmount = ({
  tileClasses,
  tokenPrice,
  activeValidatorsCount,
  activeBalance,
}: WithdrawableAmountParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Withdrawable Amount</div>
      <p className="text-slate-gray font-bold">
        {`${(
          activeBalance / 1e9 -
          activeValidatorsCount * 32
        ).toLocaleString()} LYX`}
      </p>
      <DisplayTokenPrice
        tokenPrice={tokenPrice}
        tokenAmount={activeBalance / 1e9 - activeValidatorsCount * 32}
      />
    </div>
  );
};
