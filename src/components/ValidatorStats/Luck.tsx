import { LuckParams } from "../../typings/types";

export const Luck = ({ tileClasses, validatorsLuck }: LuckParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Luck</div>
      <p className="text-gray-600 font-bold">
        {`${
          validatorsLuck.proposal_luck
            ? validatorsLuck.proposal_luck.toLocaleString()
            : 0
        } %`}
      </p>
    </div>
  );
};
