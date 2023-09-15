import { ValidatorMap } from "../../typings/types";

type ValidatorsParams = {
  tileClasses: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
};

export const Validators = ({
  tileClasses,
  activeValidators,
  pendingValidators,
}: ValidatorsParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Validators</div>
      <p className="text-pastel-green font-bold">
        {`Active: ${Object.getOwnPropertyNames(activeValidators).length}`}
      </p>
      <p className="text-pastel-red font-bold">
        {`Pending: ${Object.getOwnPropertyNames(pendingValidators).length}`}
      </p>
    </div>
  );
};
