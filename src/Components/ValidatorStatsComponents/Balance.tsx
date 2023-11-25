// components
import { DisplayTokenPrice } from '../DisplayTokenPrice';

// types
import { ValidatorsBalances } from '../../Types/UsedDataTypes';

interface Props {
  validatorsBalances: ValidatorsBalances;
}

export const Balance: React.FC<Props> = ({
  validatorsBalances: {
    activeBalance,
    pendingBalance,
    offlineBalance,
    slashedBalance,
    otherBalance,
  },
}) => {
  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Validator Balance
          </h2>
          <p className="paragraph-inter-14-medium">
            Active:
            <span className="text-green-45">{` ${(
              activeBalance / 1e9
            ).toLocaleString()} LYX`}</span>
          </p>
          {pendingBalance > 0 ? (
            <p className="paragraph-inter-14-medium">
              Pending:
              <span className="text-yellow-55">{` ${(
                pendingBalance / 1e9
              ).toLocaleString()} LYX`}</span>
            </p>
          ) : (
            <></>
          )}
          {offlineBalance > 0 ? (
            <p className="paragraph-inter-14-medium">
              Offline:
              <span className="text-yellow-55">{` ${(
                offlineBalance / 1e9
              ).toLocaleString()} LYX`}</span>
            </p>
          ) : (
            <></>
          )}
          {slashedBalance > 0 ? (
            <p className="paragraph-inter-14-medium">
              Slashed:
              <span className="text-red-55">{` ${(
                slashedBalance / 1e9
              ).toLocaleString()} LYX`}</span>
            </p>
          ) : (
            <></>
          )}
          {otherBalance > 0 ? (
            <p className="paragraph-inter-14-medium">
              Other:
              <span className="text-red-55">{` ${(
                otherBalance / 1e9
              ).toLocaleString()} LYX`}</span>
            </p>
          ) : (
            <></>
          )}
          <DisplayTokenPrice
            tokenAmount={
              (activeBalance + pendingBalance + slashedBalance + otherBalance) /
              1e9
            }
          />
        </div>
      </lukso-card>
    </div>
  );
};
