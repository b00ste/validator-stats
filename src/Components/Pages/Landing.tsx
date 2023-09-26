import { useNavigate } from "react-router-dom";
import Notification from "../Notification";
import { useState } from "react";
import { LandingPageParams } from "../../Types/ComponentParamsTypes";

const Landing = ({ handlePageNavigation }: LandingPageParams) => {
  const navigate = useNavigate();
  const [addressCopiedOpacity, setAddressCopiedOpacity] = useState(
    "opacity-0 pointer-events-none"
  );

  const handleAddressCopy = () => {
    setAddressCopiedOpacity("opacity-100");
    navigator.clipboard.writeText(supportProjectAddress);
    setTimeout(
      () => setAddressCopiedOpacity("opacity-0 pointer-events-none"),
      1500
    );
  };

  const supportProjectAddress = "0x6A0e62776530d9F9B73463F20e34D0f9fe5FEED1";

  return (
    <div className="container mx-auto p-4">
      <section className="bg-misty-rose rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Monitor Your Ethereum Validators
        </h2>
        <p className="text-lg mb-4">
          Effortlessly manage and optimize your Ethereum validator portfolio
          using our robust monitoring tool. Here's what you can achieve:
        </p>
        <ul className="mb-8">
          <li className="list-disc my-4 ml-8 underline underline-offset-4 decoration-dark-pink">
            Keep a close watch on the real-time status of your validators, along
            with the accumulated LYX earnings and withdrawals.
          </li>
          <li className="list-disc my-4 ml-8 underline underline-offset-4 decoration-dark-pink">
            Monitor the total balance across your withdrawal addresses.
          </li>
          <li className="list-disc my-4 ml-8 underline underline-offset-4 decoration-dark-pink">
            Dive deep into your earnings data, with detailed breakdowns
            available for daily, weekly, monthly, annual, and total earnings.
          </li>
          <li className="list-disc my-4 ml-8 underline underline-offset-4 decoration-dark-pink">
            Evaluate validator performance with an easy-to-understand
            performance percentage, ensuring your investments are performing
            optimally.
          </li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-alabaster p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Validator Statistics</h3>
            <p className="text-slate-gray">
              Check the validator statistics page.
            </p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-strong-pink py-2 px-4 rounded-3xl hover:bg-dark-pink"
                onClick={() =>
                  handlePageNavigation(navigate, "/validatorStatistics")
                }
              >
                Validator Stats
              </button>
            </div>
          </div>
          <div className="bg-alabaster p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Validator List</h3>
            <p className="text-slate-gray">Check the list of validators.</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-strong-pink py-2 px-4 rounded-3xl hover:bg-dark-pink"
                onClick={() => handlePageNavigation(navigate, "/validatorList")}
              >
                Validator List
              </button>
            </div>
          </div>
          <div className="bg-alabaster p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">User</h3>
            <p className="text-slate-gray">Update your withdrawal addresses</p>
            <div className="flex justify-center mt-4">
              <button
                className="bg-strong-pink py-2 px-4 rounded-3xl hover:bg-dark-pink"
                onClick={() => handlePageNavigation(navigate, "/user")}
              >
                User
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-4 bg-misty-rose rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Support the author:</h2>
        <p className="text-lg mb-4">
          The react app is done for personal use, but its made available to be
          used publicly. If you find it usefull you can support the development
          of the tool.
        </p>
        <div className="text-center break-all grid flex-col grid-cols-1">
          <code
            className="cursor-pointer hover:text-slate-gray"
            onClick={() => handleAddressCopy()}
          >
            {supportProjectAddress}
          </code>
          <p className="text-xs">(Click on address to copy)</p>
          {/* <img src={qrCode} alt="Support project QR code" /> */}

          <Notification
            notificationDescription="Address copied!"
            opacity={addressCopiedOpacity}
          />
        </div>
      </section>
    </div>
  );
};

export default Landing;
