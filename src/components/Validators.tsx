import validators from "../assets/validators.png";
import { Validator } from "../typings/types";

export const Validators = ({
  tileStyle,
  titleStyle,
  activeValidatorList,
  pendingValidatorList,
}: {
  tileStyle: string;
  titleStyle: string;
  activeValidatorList: Validator[];
  pendingValidatorList: Validator[];
}) => {
  return (
    <div className={tileStyle}>
      <img src={validators} className="w-10 h-10" alt="validators" />
      <div>
        <p className={titleStyle}>Validators</p>
        <p className="text-green-600 font-bold">{`Active: ${activeValidatorList?.length}`}</p>
        <p className="text-red-600 font-bold">{`Pending: ${pendingValidatorList?.length}`}</p>
      </div>
    </div>
  );
};
