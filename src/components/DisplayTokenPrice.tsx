import { DisplayTokenPriceParams } from "../Types/ComponentParamsTypes";

export const DisplayTokenPrice = ({
  tokenPrice: { eurPrice, usdPrice },
  tokenAmount,
}: DisplayTokenPriceParams) => {
  return (
    <div className="container mx-auto grid grid-cols-2">
      <div className="border-dark-pink col-span-2 border-b my-2 mx-4" />
      <p className="text-dark-pink font-bold text-xs">
        {`${(tokenAmount * Number.parseFloat(eurPrice)).toLocaleString()} €`}
      </p>
      <p className="text-dark-pink font-bold text-xs">
        {`${(tokenAmount * Number.parseFloat(usdPrice)).toLocaleString()} $`}
      </p>
    </div>
  );
};
