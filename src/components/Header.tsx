import { useNavigate } from "react-router-dom";
import { HeaderParams } from "../typings/types";

export const Header = ({
  stakedLYX,
  currentEpoch,
  networkValidators,
  tokenPrice: { eurPrice, usdPrice },
}: HeaderParams) => {
  const navigate = useNavigate();

  const tileClasses =
    "mb-2 text-center flex flex-col items-center justify-center overflow-clip overflow-ellipsis";

  const buttonClasses =
    "bg-strong-pink text-white px-3 py-1.5 rounded-b-lg hover:bg-dark-pink ";

  return (
    <nav className="absolute top-0 left-4 right-4">
      <div className="bg-pastel-white-pink p-4 rounded-b-3xl shadow">
        <div className="container mx-auto grid grid-cols-3">
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
        <div className="col-span-5 border-b border-dark-pink mb-2 mx-4"></div>
        <div className="container mx-auto grid grid-cols-3">
          <div className={`${tileClasses}`}>
            <p className="text-dark-pink font-bold text-sm">LYX Price</p>
          </div>
          <div className={`${tileClasses}`}>
            <p className="text-dark-pink font-bold text-sm">{`${eurPrice} €`}</p>
          </div>
          <div className={`${tileClasses}`}>
            <p className="text-dark-pink font-bold text-sm">{`${usdPrice} $`}</p>
          </div>
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
      </div>
    </nav>
  );
};
