type LYXPriceParams = {
  tileClasses: string;
  eurPrice: string;
  usdPrice: string;
};

export const LYXPrice = ({
  tileClasses,
  eurPrice,
  usdPrice,
}: LYXPriceParams) => {
  return (
    <div className={`${tileClasses}`}>
      <div className="text-pastel-blue text-xl mb-2">LYX Price</div>
      <p className="text-gray-600">{`${eurPrice} €`}</p>
      <p className="text-gray-600">{`${usdPrice} $`}</p>
    </div>
  );
};
