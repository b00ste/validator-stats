// types
import { ValidatorsCount } from '../../Types/UsedDataTypes';

interface Props {
  validatorsCount: ValidatorsCount;
}

export const Validators: React.FC<Props> = ({
  validatorsCount: {
    activeValidatorsCount,
    pendingValidatorsCount,
    offlineValidatorsCount,
    slashedValidatorsCount,
    otherValidatorsCount,
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
            Validators
          </h2>
          <p className="paragraph-inter-14-medium">
            Active:
            <span className="text-green-45">{` ${activeValidatorsCount}`}</span>
          </p>
          {pendingValidatorsCount > 0 ? (
            <p className="paragraph-inter-14-medium">
              Pending:
              <span className="text-yellow-55">{` ${pendingValidatorsCount}`}</span>
            </p>
          ) : (
            <></>
          )}
          {offlineValidatorsCount > 0 ? (
            <p className="paragraph-inter-14-medium">
              Pending:
              <span className="text-yellow-55">{` ${offlineValidatorsCount}`}</span>
            </p>
          ) : (
            <></>
          )}
          {slashedValidatorsCount > 0 ? (
            <p className="paragraph-inter-14-medium">
              Slashed:
              <span className="text-red-55">{` ${slashedValidatorsCount}`}</span>
            </p>
          ) : (
            <></>
          )}
          {otherValidatorsCount > 0 ? (
            <p className="paragraph-inter-14-medium">
              Other:
              <span className="text-red-55">{` ${otherValidatorsCount}`}</span>
            </p>
          ) : (
            <></>
          )}
        </div>
      </lukso-card>
    </div>
  );
};
