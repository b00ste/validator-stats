import luck from "../../assets/luck.png";
import { ValidatorsLuck } from "../../typings/types";

type LuckParams = {
  tileStyle: string;
  titleStyle: string;
  validatorsLuck: ValidatorsLuck;
};

export const Luck = ({ tileStyle, titleStyle, validatorsLuck }: LuckParams) => {
  return (
    <div className={tileStyle}>
      <img src={luck} className="w-10 h-10" alt="luck" />
      <div>
        <p className={titleStyle}>Luck</p>
        <p>
          Luck:{" "}
          {validatorsLuck.proposal_luck
            ? validatorsLuck.proposal_luck.toFixed(4)
            : 0}
          %
        </p>
        <p>
          {`Next block:
          ${new Date(
            validatorsLuck.next_proposal_estimate_ts * 1000
          ).toLocaleTimeString()} 
          ${new Date(
            validatorsLuck.next_proposal_estimate_ts * 1000
          ).toLocaleDateString()}`}
        </p>
        <p>Next block timeframe: {validatorsLuck.time_frame_name}</p>
      </div>
    </div>
  );
};
