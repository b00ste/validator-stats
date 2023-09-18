import { useNavigate } from "react-router-dom";
import { LandingPageParams } from "../typings/types";

export const LandingPage = ({ pageChangeHandler }: LandingPageParams) => {
  const navigate = useNavigate();

  const supportProjectAddress = "0x6A0e62776530d9F9B73463F20e34D0f9fe5FEED1";

  const qrCode = "";

  return (
    <div className="container mx-auto p-4">
      <section className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Monitor Your Ethereum Validators
        </h2>
        <p className="text-lg mb-4">
          Effortlessly oversee the status and performance of your Ethereum
          validators with our powerful monitoring tool. Here's what you can do:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-pastel-green p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Validator Status</h3>
            <p className="text-gray-700">
              Stay informed about the activity, pending actions, and any
              penalties incurred by your validators.
            </p>
          </div>
          <div className="bg-pastel-purple p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Token Withdrawals</h3>
            <p className="text-gray-700">
              Easily track total token withdrawals, available withdrawal
              amounts, and the balances of withdrawal addresses.
            </p>
          </div>
          <div className="bg-pastel-blue p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Earnings Analysis</h3>
            <p className="text-gray-700">
              Gain valuable insights into your earnings, with detailed data
              available for daily, weekly, monthly, annual, and total earnings.
            </p>
          </div>
          <div className="bg-pastel-pink p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Percentage Rates</h3>
            <p className="text-gray-700">
              View approximate percentage rates for daily, weekly, monthly, and
              annual earnings, helping you make informed decisions.
            </p>
          </div>
          <div className="bg-pastel-orange p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Validator Performance
            </h3>
            <p className="text-gray-700">
              Assess validator performance with a performance percentage,
              ensuring optimal performance for your investments.
            </p>
          </div>
          <div className="bg-pastel-red p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Validator Luck</h3>
            <p className="text-gray-700">
              Evaluate your validators' luck, providing insights into the
              probability of being selected to propose a block.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
        <p className="text-lg mb-4">
          Add you withdrawal or deposit address and start monitoring your
          Ethereum validators effortlessly.
        </p>
        <div className="text-center">
          <button
            className="bg-pastel-green text-white px-3 py-1.5 m-1 rounded-lg hover:bg-dark-pink"
            onClick={() => pageChangeHandler(navigate, "/user")}
          >
            User Page
          </button>
        </div>
      </section>

      <section className="mt-4 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Support the author:</h2>
        <p className="text-lg mb-4">
          The react app is done for personal use, but its made available to be
          used publicly. If you find it usefull you can support the development
          of the tool.
        </p>
        <div className="text-center break-all grid flex-col grid-cols-1">
          <code
            className="cursor-pointer hover:text-gray-700"
            onClick={() => {
              navigator.clipboard.writeText(supportProjectAddress);
            }}
          >
            {supportProjectAddress}
          </code>
          <p className="text-xs">(Click on address to copy)</p>
          {/* <img src={qrCode} alt="Support project QR code" /> */}
        </div>
      </section>
    </div>
  );
};
