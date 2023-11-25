// import { useContext } from 'react';
import { Link } from 'react-router-dom';

// context
// import { LYXPriceContext, NetworkContext } from '../App';

interface Props {
  refreshHandler: Function;
}

const Header: React.FC<Props> = ({ refreshHandler }) => {
  // const {
  //   networkValidators = 0,
  //   stakedLYX = 0,
  //   currentEpoch = 0,
  // } = useContext(NetworkContext);
  // const { eur = 0, usd = 0 } = useContext(LYXPriceContext);

  return (
    <lukso-navbar
      logo-url="/assets/images/validator-stats-logo.png"
      title={`VALIDATOR\nSTATS`}
      has-menu
    >
      <div slot="desktop" className="flex flex-row">
        <Link to="/home">
          <lukso-button custom-class="mr-2" variant="landing">
            Home
          </lukso-button>
        </Link>
        <Link to="/user">
          <lukso-button custom-class="mr-2" variant="landing">
            User
          </lukso-button>
        </Link>
        <Link to="/validatorStatistics">
          <lukso-button custom-class="mr-2" variant="landing">
            Validator Stats
          </lukso-button>
        </Link>
        <Link to="/validatorList">
          <lukso-button custom-class="mr-2" variant="landing">
            Validators
          </lukso-button>
        </Link>
        <lukso-button
          custom-class="mr-2"
          variant="landing"
          onClick={() => refreshHandler()}
        >
          Refresh Data
        </lukso-button>
      </div>
      <div slot="mobile">
        <div className="flex flex-col items-center justify-center h-screen pb-32">
          <Link to="/home">
            <lukso-button custom-class="mb-2" variant="landing">
              Home
            </lukso-button>
          </Link>
          <Link to="/user">
            <lukso-button custom-class="mb-2" variant="landing">
              User
            </lukso-button>
          </Link>
          <Link to="/validatorStatistics">
            <lukso-button custom-class="mb-2" variant="landing">
              Validator Stats
            </lukso-button>
          </Link>
          <Link to="/validatorList">
            <lukso-button custom-class="mb-2" variant="landing">
              Validators
            </lukso-button>
          </Link>
          <lukso-button
            custom-class="mb-2"
            variant="landing"
            onClick={() => refreshHandler()}
          >
            Refresh Data
          </lukso-button>
        </div>
      </div>
    </lukso-navbar>
    // <nav className="absolute top-0 left-4 right-4">
    //   <div
    //     className={`bg-misty-rose border-2 border-t-0 border-emerald p-4 rounded-b-3xl shadow transition-all ${
    //       isDropdownOpen ? 'h-60 duration-150' : 'h-32 delay-75 duration-150'
    //     }`}
    //   >
    //     <div className="container mx-auto grid grid-cols-3">
    //       <div className={`${tileClasses}`}>
    //         <div className="text-pastel-blue text-xl mb-2">Validators</div>
    //         <p className=" text-dark-pink font-extrabold text-xl">
    //           {networkValidators.toLocaleString()}
    //         </p>
    //       </div>
    //       <div className={`${tileClasses}`}>
    //         <div className="text-pastel-blue text-xl mb-2">Staked LYX</div>
    //         <p className=" text-dark-pink font-extrabold text-xl">
    //           {Math.round(stakedLYX / 1e9).toLocaleString()}
    //         </p>
    //       </div>
    //       <div className={`${tileClasses}`}>
    //         <div className="text-pastel-blue text-xl mb-2">Epoch</div>
    //         <p className=" text-dark-pink font-extrabold text-xl">
    //           {currentEpoch.toLocaleString()}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="border-b border-dark-pink mb-2 mx-4"></div>
    //     <div className="container mx-auto grid grid-cols-3">
    //       <div className={`${tileClasses}`}>
    //         <p className="text-dark-pink font-bold text-sm">LYX Price</p>
    //       </div>
    //       <div className={`${tileClasses}`}>
    //         <p className="text-dark-pink font-bold text-sm">{`${eur.toLocaleString()} €`}</p>
    //       </div>
    //       <div className={`${tileClasses}`}>
    //         <p className="text-dark-pink font-bold text-sm">{`${usd.toLocaleString()} $`}</p>
    //       </div>
    //     </div>
    //     <div
    //       className={`container mx-auto grid grid-cols-1 transition-all ${
    //         isDropdownOpen
    //           ? 'opacity-100 delay-75 duration-150'
    //           : 'opacity-0 pointer-events-none duration-200'
    //       }`}
    //     >
    //       <div className="flex justify-center content-center w-full mx-auto">
    //         <button
    //           className={`${buttonClasses} ${additionalButtonClasses}`}
    //           onClick={() => handlePageNavigation(navigate, '/home')}
    //         >
    //           Home
    //         </button>
    //         <button
    //           className={`${buttonClasses} ${additionalButtonClasses}`}
    //           onClick={() => handlePageNavigation(navigate, '/user')}
    //         >
    //           User
    //         </button>
    //         <button
    //           className={`${buttonClasses} ${additionalButtonClasses}`}
    //           onClick={() =>
    //             handlePageNavigation(navigate, '/validatorStatistics')
    //           }
    //         >
    //           Validator Stats
    //         </button>
    //       </div>
    //       <div className="flex justify-center content-center w-full mx-auto">
    //         <button
    //           className={`${buttonClasses} ${additionalButtonClasses}`}
    //           onClick={() => handlePageNavigation(navigate, '/validatorList')}
    //         >
    //           Validators
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex justify-between pl-16 pr-16 space-x-4">
    //     <button
    //       className={`${buttonClasses} rounded-b-lg rounded-t-none border-t-0`}
    //       onClick={() => refreshHandler()}
    //     >
    //       Refresh Data
    //     </button>
    //     <button
    //       className={`${buttonClasses} rounded-b-lg rounded-t-none border-t-0`}
    //       onClick={() => toggleDropdown()}
    //     >
    //       Menu
    //     </button>
    //   </div>
    // </nav>
  );
};

export default Header;
