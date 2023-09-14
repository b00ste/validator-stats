import validators from "../../assets/validators.png";
import { ValidatorMap } from "../../typings/types";

type ValidatorsParams = {
  tileStyle: string;
  titleStyle: string;
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
};

export const Validators = ({
  tileStyle,
  titleStyle,
  activeValidators,
  pendingValidators,
}: ValidatorsParams) => {
  return (
    <div className={tileStyle}>
      <img src={validators} className="w-10 h-10" alt="validators" />
      <div>
        <p className={titleStyle}>Validators</p>
        <p className="text-green-600 font-bold">{`Active: ${
          Object.getOwnPropertyNames(activeValidators).length
        }`}</p>
        <p className="text-red-600 font-bold">{`Pending: ${
          Object.getOwnPropertyNames(pendingValidators).length
        }`}</p>
      </div>
    </div>
  );
};
