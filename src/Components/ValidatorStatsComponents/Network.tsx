import { useContext } from 'react';

// context
import { LYXPriceContext, NetworkContext } from '../../App';

const Network = () => {
  const {
    networkValidators = 0,
    stakedLYX = 0,
    currentEpoch = 0,
  } = useContext(NetworkContext);
  const { eur = 0, usd = 0 } = useContext(LYXPriceContext);

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-4 container flex flex-row flex-wrap justify-center">
            <div className="col-span-1 p-2 border-t border-purple-31 border-spacing-2">
              <h2 className="heading-inter-17-semi-bold mb-4 text-center text-purple-31">
                Validators
              </h2>
              <p className="heading-inter-21-semi-bold text-neutral-15">
                {networkValidators.toLocaleString()}
              </p>
            </div>
            <div className="col-span-1 p-2 border-t border-purple-31 border-spacing-2">
              <h2 className="heading-inter-17-semi-bold mb-4 text-center text-purple-31">
                Staked LYX
              </h2>
              <p className="heading-inter-21-semi-bold text-neutral-15">
                {Math.round(stakedLYX / 1e9).toLocaleString()}
              </p>
            </div>
            <div className="col-span-1 p-2 border-t border-purple-31 border-spacing-2">
              <h2 className="heading-inter-17-semi-bold mb-4 text-center text-purple-31">
                Epoch
              </h2>
              <p className="heading-inter-21-semi-bold text-neutral-15">
                {currentEpoch.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="container flex flex-row flex-wrap justify-center">
            <h2 className="heading-inter-17-semi-bold text-lukso-70 p-2 border-t border-lukso-70 border-spacing-2">
              LYX Price
            </h2>
            <p className="heading-inter-17-semi-bold text-lukso-70 p-2 border-t border-lukso-70 border-spacing-2">{`${eur.toLocaleString()} €`}</p>
            <p className="heading-inter-17-semi-bold text-lukso-70 p-2 border-t border-lukso-70 border-spacing-2">{`${usd.toLocaleString()} $`}</p>
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default Network;
