import { useContext } from 'react';

// context
import { LYXPriceContext } from '../App';

interface Props {
  tokenAmount: number;
}

export const DisplayTokenPrice: React.FC<Props> = ({ tokenAmount }) => {
  const { eur = 0, usd = 0 } = useContext(LYXPriceContext);

  return (
    <div className="container grid grid-cols-2 text-center">
      <div className="border-lukso-70 col-span-2 border-b my-2 mx-4" />
      <p className="paragraph-inter-12-medium text-lukso-70">
        {`${(tokenAmount * eur).toLocaleString()} €`}
      </p>
      <p className="paragraph-inter-12-medium text-lukso-70">
        {`${(tokenAmount * usd).toLocaleString()} $`}
      </p>
    </div>
  );
};
