// import { useContext } from 'react';
import { Link } from 'react-router-dom';

// context
// import { LYXPriceContext, NetworkContext } from '../App';

interface Props {
  refreshHandler: Function;
}

const Header: React.FC<Props> = ({ refreshHandler }) => {
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
  );
};

export default Header;
