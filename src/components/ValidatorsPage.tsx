import { useState } from "react";
import { ValidatorMap } from "../typings/types";
import { consensys_explorer } from "../helpers/constants";

type ValidatorsPageParams = {
  validatorArray: string[];
  activeValidators: ValidatorMap;
  pendingValidators: ValidatorMap;
};

export const ValidatorsPage = ({
  validatorArray,
  activeValidators,
  pendingValidators,
}: ValidatorsPageParams) => {
  const [selectedValidators, setSelectedValidators] = useState("active_online");

  return (
    <div className="container max-w-6xl px-5 mx-auto my-28">
      <div className="grid sm:grid-cols-2 m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-60">
        <button
          className="p-2 bg-rose-400 w-auto m-2 rounded-xl"
          onClick={() => setSelectedValidators("active_online")}
        >
          Active Validators
        </button>
        <button
          className="p-2 bg-rose-400 w-auto m-2 rounded-xl"
          onClick={() => setSelectedValidators("pending")}
        >
          Pending Validators
        </button>
      </div>
      <>
        {selectedValidators === "active_online" ? (
          <div className="grid flex-row m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-40 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 text-center">
            <p className="w-36 truncate m-1">Public Key</p>
            <p className="w-20  inline m-1">Index</p>
            <p className="w-20  inline m-1">Balance</p>
            <p className="w-24  inline m-1">Withdrawal</p>
            <p className="w-28 inline m-1">Status</p>
          </div>
        ) : selectedValidators === "pending" ? (
          <div className="grid flex-row m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-40 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 text-center">
            <p className="w-36 truncate m-1">Public Key</p>
            <p className="w-20  inline m-1">Index</p>
            <p className="w-20  inline m-1">Balance</p>
            <p className="w-28 inline m-1">Status</p>
          </div>
        ) : (
          <></>
        )}
      </>
      {validatorArray.map((validator) => {
        console.log(pendingValidators[validator]);
        switch (selectedValidators) {
          case "active_online": {
            if (activeValidators[validator]) {
              return (
                <div className="grid flex-row m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-40 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 text-center">
                  <a
                    href={`${consensys_explorer}/validator/${validator.substring(
                      2
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-36 truncate m-1 underline"
                  >
                    {validator}
                  </a>
                  <p className="w-20 inline m-1">
                    {activeValidators[validator].validatorindex}
                  </p>
                  <p className="w-20 inline m-1">
                    {(activeValidators[validator].balance / 1e9).toFixed(4)}
                  </p>
                  <p className="w-24 inline m-1">
                    {(
                      activeValidators[validator].total_withdrawals / 1e9
                    ).toFixed(4)}
                  </p>
                  <p className="w-28 inline m-1">
                    {activeValidators[validator].status}
                  </p>
                </div>
              );
            }
            break;
          }
          case "pending": {
            if (pendingValidators[validator]) {
              return (
                <div className="grid flex-row m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-40 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 text-center">
                  <a
                    href={`${consensys_explorer}/validator/${validator.substring(
                      2
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-36 truncate m-1 underline"
                  >
                    {validator}
                  </a>
                  <p className="w-20 inline m-1">
                    {pendingValidators[validator].validatorindex}
                  </p>
                  <p className="w-20 inline m-1">
                    {(pendingValidators[validator].balance / 1e9).toFixed(4)}
                  </p>
                  <p className="w-28 inline m-1">
                    {pendingValidators[validator].status}
                  </p>
                </div>
              );
            }
            break;
          }
          default:
            return <></>;
        }
        return <></>;
      })}
    </div>
  );
};
