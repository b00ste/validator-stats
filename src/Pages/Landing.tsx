import { useState } from 'react';
import { Link } from 'react-router-dom';

// components
import Notification from '../Components/Notification';

const Landing = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddressCopy = () => {
    setShowNotification(true);
    navigator.clipboard.writeText(supportProjectAddress);
    setTimeout(() => setShowNotification(false), 1500);
  };

  const supportProjectAddress = '0x6A0e62776530d9F9B73463F20e34D0f9fe5FEED1';

  return (
    <>
      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div slot="content" className="p-6 flex flex-col items-center">
            <h2 className="heading-apax-24-medium mb-4">Disclaimer!</h2>
            <p className="paragraph-inter-14-regular mb-4">
              This website is not affiliated with LUKSO company in any way, the
              styling is just the same. The website is created by a community
              member (
              <a
                href="https://twitter.com/b00ste_lyx"
                target="_blank"
                rel="noreferrer"
                className="text-purple-58 hover:underline underline-offset-4"
              >
                @b00ste_lyx
              </a>
              ) for personal use. Use on your own risc.
            </p>
          </div>
        </lukso-card>
      </div>

      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div slot="content" className="p-6 flex flex-col items-center">
            <h2 className="heading-apax-24-medium mb-4">
              Monitor Your LUKSO Validators
            </h2>
            <p className="paragraph-inter-14-regular mb-4">
              Effortlessly manage and optimize your LUKSO validator portfolio
              using our robust monitoring tool. Here's what you can achieve:
            </p>
            <ul className="mb-8">
              <li className="paragraph-inter-14-regular list-disc my-4 ml-8 underline underline-offset-4 decoration-lukso-70">
                Keep a close watch on the real-time status of your validators,
                along with the accumulated LYX earnings and withdrawals.
              </li>
              <li className="paragraph-inter-14-regular list-disc my-4 ml-8 underline underline-offset-4 decoration-lukso-70">
                Monitor the total balance across your withdrawal addresses.
              </li>
              <li className="paragraph-inter-14-regular list-disc my-4 ml-8 underline underline-offset-4 decoration-lukso-70">
                Dive deep into your earnings data, with detailed breakdowns
                available for daily, weekly, monthly, annual, and total
                earnings.
              </li>
              <li className="paragraph-inter-14-regular list-disc my-4 ml-8 underline underline-offset-4 decoration-lukso-70">
                Evaluate validator performance with an easy-to-understand
                performance percentage, ensuring your investments are performing
                optimally.
              </li>
            </ul>
            <div className="flex flex-wrap items-center justify-center">
              <Link to="/user">
                <lukso-button custom-class="m-2" variant="landing">
                  User
                </lukso-button>
              </Link>
              <Link to="/validatorStatistics">
                <lukso-button custom-class="m-2" variant="landing">
                  Validator Stats
                </lukso-button>
              </Link>
              <Link to="/validatorList">
                <lukso-button custom-class="m-2" variant="landing">
                  Validators
                </lukso-button>
              </Link>
            </div>
          </div>
        </lukso-card>
      </div>

      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div slot="content" className="p-6 flex flex-col items-center">
            <h2 className="heading-apax-24-medium mb-4">Support the author:</h2>
            <p className="paragraph-inter-14-regular mb-4">
              The react app is done for personal use, but its made available to
              be used publicly. If you find it usefull you can support the
              development of the tool.
            </p>
            <div className="text-center break-all grid flex-col grid-cols-1">
              <code
                className="cursor-pointer text-purple-63 hover:text-purple-51 hover:underline underline-offset-2"
                onClick={() => handleAddressCopy()}
              >
                {supportProjectAddress}
              </code>
              <p className="paragraph-inter-12-medium">
                (Click on address to copy)
              </p>
              {/* <img src={qrCode} alt="Support project QR code" /> */}

              {showNotification ? (
                <Notification notificationHeader="Address copied!" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </lukso-card>
      </div>
    </>
  );
};

export default Landing;
