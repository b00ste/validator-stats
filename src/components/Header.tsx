import { useNavigate } from "react-router-dom";
import { HeaderParams } from "../typings/types";

export const Header = ({
  stakedLYX,
  currentEpoch,
  networkValidators,
  handleRefresh,
}: HeaderParams) => {
  const navigate = useNavigate();

  const tileClasses =
    "mb-2 text-center flex flex-col items-center justify-center overflow-clip overflow-ellipsis";

  const buttonClasses =
    "bg-strong-pink text-white px-3 py-1.5 rounded-b-lg hover:bg-dark-pink ";

  return (
    <nav className="absolute top-0 left-4 right-4">
      <div className="container mx-auto grid grid-cols-3 bg-pastel-white-pink p-4 rounded-b-3xl shadow">
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Validators</div>
          <p className=" text-dark-pink font-extrabold text-xl">
            {networkValidators.toLocaleString()}
          </p>
        </div>
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Staked LYX</div>
          <p className=" text-dark-pink font-extrabold text-xl">
            {Math.round(stakedLYX / 1e9).toLocaleString()}
          </p>
        </div>
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Epoch</div>
          <p className=" text-dark-pink font-extrabold text-xl">
            {currentEpoch.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button className={buttonClasses} onClick={() => navigate("/")}>
          stats
        </button>
        <button
          className={buttonClasses}
          onClick={() => navigate("/validators")}
        >
          validators
        </button>
        <button className={buttonClasses} onClick={() => navigate("/user")}>
          user
        </button>
        <button className={buttonClasses} onClick={() => handleRefresh()}>
          refresh
        </button>
      </div>
    </nav>
  );
};
