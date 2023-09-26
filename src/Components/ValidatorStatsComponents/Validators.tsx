import { ValidatorsParams } from "../../Types/ComponentParamsTypes";

export const Validators = ({
  tileClasses,
  validatorsCount: {
    activeValidatorsCount,
    pendingValidatorsCount,
    offlineValidatorsCount,
    slashedValidatorsCount,
    otherValidatorsCount,
  },
}: ValidatorsParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validators</div>
      <p className="text-gray-600 font-bold">
        Active:
        <span className="text-pastel-green ">
          {` ${activeValidatorsCount}`}
        </span>
      </p>
      {pendingValidatorsCount > 0 ? (
        <p className="text-gray-600 font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${pendingValidatorsCount}`}</span>
        </p>
      ) : (
        <></>
      )}
      {offlineValidatorsCount > 0 ? (
        <p className="text-gray-600 font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${offlineValidatorsCount}`}</span>
        </p>
      ) : (
        <></>
      )}
      {slashedValidatorsCount > 0 ? (
        <p className="text-gray-600 font-bold">
          Slashed:
          <span className="text-pastel-red">{` ${slashedValidatorsCount}`}</span>
        </p>
      ) : (
        <></>
      )}
      {otherValidatorsCount > 0 ? (
        <p className="text-gray-600 font-bold">
          Other:
          <span className="text-pastel-red">{` ${otherValidatorsCount}`}</span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
