type LYXPriceParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
  LYXPriceNeedsUpdate: boolean;
};

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
          <p className="text-gray-600">{`${eurPrice} €`}</p>
          <p className="text-gray-600">{`${usdPrice} $`}</p>
        </>
      )}
    </div>
  );
};
