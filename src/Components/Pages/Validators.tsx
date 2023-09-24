import { useEffect, useState } from "react";

// utils
import { consensys_explorer } from "../../Helpers/constants";

// types
import { ValidatorsPageParams } from "../../Types/ComponentParamsTypes";
import { ValidatorMap } from "../../Types/UsedDataTypes";
import { generateUUID } from "../../Helpers/utils";

export const Validators = ({
  mountValidatorsPage,
  bodyClasses,
  publicKeys,
  validators,
  validatorsMaps: {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  },
  validatorsPerformance,
}: ValidatorsPageParams) => {
  const [selectedValidators, setSelectedValidators] = useState("active");

  const findAddressName = (bytes: string) => {
    if (bytes.length === 66) {
      const address = `0x${bytes.substring(bytes.length - 40)}`;

      return (
        <td className={tableHeadStyle} key={generateUUID()}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
            key={generateUUID()}
          >
            {
              publicKeys.filter(
                (elem) => elem.address.toLowerCase() === address.toLowerCase()
              )[0].name
            }
          </a>
        </td>
      );
    } else if (bytes.length === 42) {
      const address = bytes;

      return (
        <td className={tableHeadStyle}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
          >
            {
              publicKeys.filter(
                (elem) => elem.address.toLowerCase() === address.toLowerCase()
              )[0].name
            }
          </a>
        </td>
      );
    }

    return <td className={tableHeadStyle}>Name Unknown</td>;
  };

  const getValidatorRow = (validatorMap: ValidatorMap, validator: string) => {
    return (
      <tr key={generateUUID()}>
        <td key={generateUUID()}>
          <a
            href={`${consensys_explorer}/validator/${validator.substring(2)}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
            key={generateUUID()}
          >
            {`${validator.substring(0, 4)}...${validator.substring(
              validator.length - 2,
              validator.length
            )}`}
          </a>
        </td>
        <td className={tableHeadStyle} key={generateUUID()}>
          {validatorMap[validator].validatorindex}
        </td>
        <td className={tableHeadStyle} key={generateUUID()}>
          {`${(validatorMap[validator].balance / 1e9).toLocaleString()}`}
        </td>
        <td className={tableHeadStyle} key={generateUUID()}>
          {validatorsPerformance[validatorMap[validator].validatorindex]
            ? validatorsPerformance[validatorMap[validator].validatorindex]
                .attestationPerformance.executedAttestations
            : 0}
        </td>
        <td className={tableHeadStyle} key={generateUUID()}>
          {validatorsPerformance[validatorMap[validator].validatorindex]
            ? validatorsPerformance[validatorMap[validator].validatorindex]
                .attestationPerformance.missedAttestations
            : 0}
        </td>
        <td className={tableHeadStyle} key={generateUUID()}>
          {`${
            validatorsPerformance[validatorMap[validator].validatorindex]
              ? (
                  (validatorsPerformance[validatorMap[validator].validatorindex]
                    .attestationPerformance.executedAttestations /
                    validatorsPerformance[
                      validatorMap[validator].validatorindex
                    ].attestationPerformance.attestationCount) *
                  100
                ).toLocaleString()
              : 0
          } %`}
        </td>
        {findAddressName(validatorMap[validator].withdrawalcredentials)}
      </tr>
    );
  };

  /// ------ Styling Handling ------
  const [opacity, setOpacity] = useState("opacity-0");
  // Run on mount
  useEffect(() => {
    setOpacity("opacity-100");
  }, []);
  // Run on un-mount
  useEffect(() => {
    if (!mountValidatorsPage) {
      setOpacity("opacity-0");
    }
  }, [mountValidatorsPage]);

  const tableHeadStyle = "text-gray-700 px-4 py-1";
  /// ------------------------------

  return (
    <div className={`${bodyClasses} ${opacity}`}>
      {/* <!-- Tile 1: Validator Buttons --> */}
      <div className="bg-pastel-light-pink p-4 rounded-lg shadow text-center flex flex-col items-center">
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
            onClick={() => setSelectedValidators("offline")}
          >
            Offline
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
      <div className="bg-pastel-light-pink p-4 rounded-lg shadow">
        <h2 className="text-pastel-blue text-2xl mb-4">Ethereum Validators</h2>
        <div className="overflow-x-scroll">
          <table className="table-auto break-words w-full text-center">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className={tableHeadStyle}>Address</th>
                <th className={tableHeadStyle}>Index</th>
                <th className={tableHeadStyle}>Balance (LYX)</th>
                <th className={tableHeadStyle}>Executed Attestations</th>
                <th className={tableHeadStyle}>Missed Attestations</th>
                <th className={tableHeadStyle}>Performance</th>
                <th className={tableHeadStyle}>Withdrawal Address</th>
              </tr>
            </thead>
            <tbody>
              {Object.getOwnPropertyNames(validators).map((pubKey) =>
                validators[pubKey].map((validator) => {
                  switch (selectedValidators) {
                    case "active": {
                      if (activeValidators[validator]) {
                        return getValidatorRow(activeValidators, validator);
                      }
                      break;
                    }
                    case "pending": {
                      if (pendingValidators[validator]) {
                        return getValidatorRow(pendingValidators, validator);
                      }
                      break;
                    }
                    case "offline": {
                      if (offlineValidators[validator]) {
                        return getValidatorRow(offlineValidators, validator);
                      }
                      break;
                    }
                    case "slashed": {
                      if (slashedValidators[validator]) {
                        return getValidatorRow(slashedValidators, validator);
                      }
                      break;
                    }
                    case "other": {
                      if (otherValidators[validator]) {
                        return getValidatorRow(otherValidators, validator);
                      }
                      break;
                    }
                    default:
                      return <></>;
                  }
                  return <></>;
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Validators;
