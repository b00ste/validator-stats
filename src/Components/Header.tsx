import { useNavigate } from "react-router-dom";

// types
import { HeaderParams } from "../Types/ComponentParamsTypes";

const Header = ({
  networkData: { stakedLYX, currentEpoch, networkValidators },
  tokenPrice: { eurPrice, usdPrice },
  isDropdownOpen,
  toggleDropdown,
  refreshHandler,
  handlePageNavigation,
}: HeaderParams) => {
  const navigate = useNavigate();

  const tileClasses =
    "mb-2 text-center flex flex-col items-center justify-center overflow-clip overflow-ellipsis";

  const buttonClasses = "text-strong-pink m-1 hover:text-dark-pink col-span-1";

  return (
    <nav className="absolute top-0 left-4 right-4">
      <div
        className={`bg-pastel-white-pink p-4 rounded-b-3xl shadow transition-all ${
          isDropdownOpen ? "h-48 duration-150" : "h-32 delay-75 duration-150"
        }`}
      >
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
        <div className="border-b border-dark-pink mb-2 mx-4"></div>
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
        <div
          className={`container grid grid-cols-1 transition-all ${
            isDropdownOpen
              ? " opacity-100 delay-75 duration-150"
              : "opacity-0 pointer-events-none duration-200"
          }`}
        >
          <div className="grid grid-cols-2 w-full mx-auto">
            <button
              className={buttonClasses}
              onClick={() => handlePageNavigation(navigate, "/home")}
            >
              Home
            </button>
            <button
              className={buttonClasses}
              onClick={() => handlePageNavigation(navigate, "/user")}
            >
              User
            </button>
          </div>
          <div className="grid grid-cols-2 w-full mx-auto">
            <button
              className={buttonClasses}
              onClick={() =>
                handlePageNavigation(navigate, "/validatorStatistics")
              }
            >
              Validator Stats
            </button>
            <button
              className={buttonClasses}
              onClick={() => handlePageNavigation(navigate, "/validatorList")}
            >
              Validators
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between pl-16 pr-16 space-x-4">
        <button
          className="bg-strong-pink text-white px-3 py-1.5 rounded-b-lg hover:bg-dark-pink max-h-10"
          onClick={() => refreshHandler()}
        >
          Refresh Data
        </button>
        <button
          className="bg-strong-pink text-white px-3 py-1.5 rounded-b-lg hover:bg-dark-pink max-h-10"
          onClick={() => toggleDropdown()}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};

export default Header;
