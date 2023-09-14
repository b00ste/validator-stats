import token_price from "../../assets/token_price.png";

type LYXPriceParams = {
  tileStyle: string;
  titleStyle: string;
  eurPrice: string;
  usdPrice: string;
};

export const LYXPrice = ({
  tileStyle,
  titleStyle,
  eurPrice,
  usdPrice,
}: LYXPriceParams) => {
  return (
    <div className={tileStyle}>
      <img src={token_price} className="w-10 h-10" alt="token_price" />
      <div>
        <p className={titleStyle}>LYX price</p>
        <p>{`${eurPrice} €`}</p>
        <p>{`${usdPrice} $`}</p>
      </div>
    </div>
  );
};
