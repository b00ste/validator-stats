import { LuckParams } from "../../typings/types";

export const Luck = ({
  tileClasses,
  validatorsLuck,
  luckNeedsUpdate,
}: LuckParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Luck</div>
      {luckNeedsUpdate && !validatorsLuck ? (
        <div className="loading-animation" />
      ) : (
        <>
          <p className="text-gray-600 font-bold">
            {`${
              validatorsLuck.proposal_luck
                ? validatorsLuck.proposal_luck.toFixed(4)
                : 0
            } %`}
          </p>
        </>
      )}
    </div>
  );
};
