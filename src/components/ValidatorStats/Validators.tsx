import { ValidatorsParams } from "../../typings/types";

export const Validators = ({
  tileClasses,
  activeValidators,
  pendingValidators,
  slashedValidators,
  otherValidators,
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
      <p className="text-gray-600 font-bold">
        Pending:
        <span className="text-pastel-orange">{` ${
          Object.getOwnPropertyNames(pendingValidators).length
        }`}</span>
      </p>
      <p className="text-gray-600 font-bold">
        Slashed:
        <span className="text-pastel-red">{` ${
          Object.getOwnPropertyNames(slashedValidators).length
        }`}</span>
      </p>
      <p className="text-gray-600 font-bold">
        Other:
        <span className="text-pastel-red">{` ${
          Object.getOwnPropertyNames(otherValidators).length
        }`}</span>
      </p>
    </div>
  );
};