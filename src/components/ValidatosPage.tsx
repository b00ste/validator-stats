import { useState } from "react";
import { consensys_explorer } from "../helpers/constants";
import { ValidatorMap } from "../typings/types";

type ValidatorsPageParams = {
  validatorArray: string[];
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
  slashedValidators: ValidatorMap;
  otherValidators: ValidatorMap;
};

export const ValidatorsPage = ({
  validatorArray,
  activeValidators,
  pendingValidators,
  slashedValidators,
  otherValidators,
}: ValidatorsPageParams) => {
  const [selectedValidators, setSelectedValidators] = useState("active");

  return (
    <div className="container mx-auto mt-40 mb-16 grid grid-cols-1  gap-4">
      {/* <!-- Tile 1: Validator Buttons --> */}
      <div className="bg-pastel-light-pink p-4 m-4 rounded-lg shadow text-center flex flex-col items-center">
        <h2 className="text-pastel-blue text-2xl mb-4">Select Validators</h2>
        <div>
          <button
            className="bg-strong-pink text-white px-4 py-2 rounded-lg mb-2 hover:bg-dark-pink m-2"
            onClick={() => setSelectedValidators("active")}
          >
            Active
          </button>
          <button
            className="bg-strong-pink text-white px-4 py-2 rounded-lg hover:bg-dark-pink m-2"
            onClick={() => setSelectedValidators("pending")}
          >
            Pending
          </button>
          <button
            className="bg-strong-pink text-white px-4 py-2 rounded-lg hover:bg-dark-pink m-2"
            onClick={() => setSelectedValidators("slashed")}
          >
            Slashed
          </button>
          <button
            className="bg-strong-pink text-white px-4 py-2 rounded-lg hover:bg-dark-pink m-2"
            onClick={() => setSelectedValidators("other")}
          >
            Other
          </button>
        </div>
      </div>

      {/* <!-- Tile 2: List of Ethereum Validators --> */}
      <div className="bg-pastel-light-pink p-4 m-4 rounded-lg shadow">
        <h2 className="text-pastel-blue text-2xl mb-4">Ethereum Validators</h2>
        <div className="grid grid-cols-5 gap-4 text-gray-700 text-sm font-bold text-center mb-2">
          <div className="col-span-1">Address</div>
          <div className="col-span-1">Index</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Balance</div>
          <div className="col-span-1 overflow-x-clip overflow-ellipsis">
            Withdrawal Balance
          </div>
          <div className="col-span-5 border-b border-gray-300"></div>
        </div>
        <ul className="space-y-4">
          {validatorArray.map((validator) => {
            switch (selectedValidators) {
              case "active": {
                if (activeValidators[validator]) {
                  return (
                    <li
                      className="grid grid-cols-5 items-center justify-between text-center"
                      key={validator}
                    >
                      <a
                        href={`${consensys_explorer}/validator/${validator.substring(
                          2
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pastel-blue hover:underline overflow-hidden"
                      >
                        {`${validator.substring(0, 4)}...${validator.substring(
                          validator.length - 2,
                          validator.length
                        )}`}
                      </a>
                      <span className="text-gray-700">
                        {activeValidators[validator].validatorindex}
                      </span>
                      <span className="text-gray-700">Active</span>
                      <span className="text-gray-700">
                        {`${(activeValidators[validator].balance / 1e9).toFixed(
                          4
                        )} LYX`}
                      </span>
                      <span className="text-gray-700">
                        {`${(
                          activeValidators[validator].total_withdrawals / 1e9
                        ).toFixed(4)} LYX`}
                      </span>
                    </li>
                  );
                }
                break;
              }
              case "pending": {
                if (pendingValidators[validator]) {
                  return (
                    <li
                      className="grid grid-cols-5 items-center justify-between text-center"
                      key={validator}
                    >
                      <a
                        href={`${consensys_explorer}/validator/${validator.substring(
                          2
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pastel-blue hover:underline overflow-hidden"
                      >
                        {`${validator.substring(0, 4)}...${validator.substring(
                          validator.length - 2,
                          validator.length
                        )}`}
                      </a>
                      <span className="text-gray-700">
                        {pendingValidators[validator].validatorindex}
                      </span>
                      <span className="text-gray-700">Pending</span>
                      <span className="text-gray-700">
                        {`${(
                          pendingValidators[validator].balance / 1e9
                        ).toFixed(4)} LYX`}
                      </span>
                      <span className="text-gray-700">0 LYX</span>
                    </li>
                  );
                }
                break;
              }
              case "slashed": {
                if (slashedValidators[validator]) {
                  return (
                    <li
                      className="grid grid-cols-5 items-center justify-between text-center"
                      key={validator}
                    >
                      <a
                        href={`${consensys_explorer}/validator/${validator.substring(
                          2
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pastel-blue hover:underline overflow-hidden"
                      >
                        {`${validator.substring(0, 4)}...${validator.substring(
                          validator.length - 2,
                          validator.length
                        )}`}
                      </a>
                      <span className="text-gray-700">
                        {slashedValidators[validator].validatorindex}
                      </span>
                      <span className="text-gray-700">Pending</span>
                      <span className="text-gray-700">
                        {`${(
                          slashedValidators[validator].balance / 1e9
                        ).toFixed(4)} LYX`}
                      </span>
                      <span className="text-gray-700">0 LYX</span>
                    </li>
                  );
                }
                break;
              }
              case "other": {
                if (otherValidators[validator]) {
                  return (
                    <li
                      className="grid grid-cols-5 items-center justify-between text-center"
                      key={validator}
                    >
                      <a
                        href={`${consensys_explorer}/validator/${validator.substring(
                          2
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-pastel-blue hover:underline overflow-hidden"
                      >
                        {`${validator.substring(0, 4)}...${validator.substring(
                          validator.length - 2,
                          validator.length
                        )}`}
                      </a>
                      <span className="text-gray-700">
                        {otherValidators[validator].validatorindex}
                      </span>
                      <span className="text-gray-700">Pending</span>
                      <span className="text-gray-700">
                        {`${(otherValidators[validator].balance / 1e9).toFixed(
                          4
                        )} LYX`}
                      </span>
                      <span className="text-gray-700">0 LYX</span>
                    </li>
                  );
                }
                break;
              }
              default:
                return <></>;
            }
            return <></>;
          })}
        </ul>
      </div>
    </div>
  );
};
