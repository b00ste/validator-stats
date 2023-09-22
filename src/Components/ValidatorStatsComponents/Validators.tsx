import { ValidatorsParams } from "../../Types/ComponentParamsTypes";

export const Validators = ({
  tileClasses,
  validatorsMaps: {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  },
}: ValidatorsParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validators</div>
      <p className="text-gray-600 font-bold">
        Active:
        <span className="text-pastel-green ">
          {` ${Object.getOwnPropertyNames(activeValidators).length}`}
        </span>
      </p>
      {Object.getOwnPropertyNames(pendingValidators).length > 0 ? (
        <p className="text-gray-600 font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${
            Object.getOwnPropertyNames(pendingValidators).length
          }`}</span>
        </p>
      ) : (
        <></>
      )}
      {Object.getOwnPropertyNames(offlineValidators).length > 0 ? (
        <p className="text-gray-600 font-bold">
          Pending:
          <span className="text-pastel-orange">{` ${
            Object.getOwnPropertyNames(offlineValidators).length
          }`}</span>
        </p>
      ) : (
        <></>
      )}
      {Object.getOwnPropertyNames(slashedValidators).length > 0 ? (
        <p className="text-gray-600 font-bold">
          Slashed:
          <span className="text-pastel-red">{` ${
            Object.getOwnPropertyNames(slashedValidators).length
          }`}</span>
        </p>
      ) : (
        <></>
      )}
      {Object.getOwnPropertyNames(otherValidators).length > 0 ? (
        <p className="text-gray-600 font-bold">
          Other:
          <span className="text-pastel-red">{` ${
            Object.getOwnPropertyNames(otherValidators).length
          }`}</span>
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
