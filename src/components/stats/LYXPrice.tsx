import { LYXPriceParams } from "../../typings/types";

export const LYXPrice = ({
  tileClasses,
  eurPrice,
  usdPrice,
  LYXPriceNeedsUpdate,
}: LYXPriceParams) => {
  return (
    <div className={`${tileClasses}`}>
      <div className="text-pastel-blue text-xl mb-2">LYX Price</div>
      {LYXPriceNeedsUpdate ? (
        <div className="loading-animation" />
      ) : (
        <>
          <p className="text-gray-600 font-bold">{`${eurPrice} €`}</p>
          <p className="text-gray-600 font-bold">{`${usdPrice} $`}</p>
        </>
      )}
    </div>
  );
};
