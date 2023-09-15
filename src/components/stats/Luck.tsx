import { ValidatorsLuck } from "../../typings/types";

type LuckParams = {
  tileClasses: string;
  validatorsLuck: ValidatorsLuck;
  luckNeedsUpdate: boolean;
};

export const Luck = ({
  tileClasses,
  validatorsLuck,
  luckNeedsUpdate,
}: LuckParams) => {
  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Luck</div>
      {luckNeedsUpdate ? (
        <div className="loading-animation" />
      ) : (
        <>
          <p className="text-gray-600">
            {`Luck: ${
              validatorsLuck.proposal_luck
                ? validatorsLuck.proposal_luck.toFixed(4)
                : 0
            } %`}
          </p>
          <p className="text-gray-600">
            {`Next block:
          ${new Date(
            validatorsLuck.next_proposal_estimate_ts * 1000
          ).toLocaleTimeString()} 
          ${new Date(
            validatorsLuck.next_proposal_estimate_ts * 1000
          ).toLocaleDateString()}`}
          </p>
        </>
      )}
    </div>
  );
};
