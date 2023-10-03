import { Fragment, useState } from 'react';

// utils
import { consensys_explorer } from '../../Helpers/constants';

// types
import { ValidatorsPageParams } from '../../Types/ComponentParamsTypes';
import { ValidatorMap, ValidatorsPerformance } from '../../Types/UsedDataTypes';
import { Validator } from '../../Types/FetchedDataTypes';

export const Validators = ({
  bodyClasses,
  tileClasses,
  withdrawalAddresses,
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
  const [selectedValidatorStatus, setSelectedValidatorStatus] =
    useState('active');
  const [selectedAccount, SetSelectedAccount] = useState(
    withdrawalAddresses[0] ? withdrawalAddresses[0].address : '',
  );

  const findAddressName = (bytes: string) => {
    if (bytes.length === 66) {
      const address = `0x${bytes.substring(bytes.length - 40)}`;

      return (
        <td className={tableHeadStyle}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
          >
            {
              withdrawalAddresses.filter(
                (elem) => elem.address.toLowerCase() === address.toLowerCase(),
              )[0].name
            }
          </a>
        </td>
      );
    } else if (bytes.length === 42) {
      const address = bytes;

      return (
        <td className={tableHeadStyle} key={address}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
          >
            {
              withdrawalAddresses.filter(
                (elem) => elem.address.toLowerCase() === address.toLowerCase(),
              )[0].name
            }
          </a>
        </td>
      );
    }

    return <td className={tableHeadStyle}>Name Unknown</td>;
  };

  const getExecutedAttestations = (
    accountValidatorsPerformance: ValidatorsPerformance,
    validatorData: Validator,
  ) => {
    if (accountValidatorsPerformance) {
      const validatorPerformance =
        accountValidatorsPerformance[validatorData.validatorindex];

      return (
        <>
          {validatorPerformance
            ? validatorPerformance.attestationPerformance.executedAttestations
            : 0}
        </>
      );
    } else return <>0</>;
  };

  const getMissedAttestations = (
    accountValidatorsPerformance: ValidatorsPerformance,
    validatorData: Validator,
  ) => {
    if (accountValidatorsPerformance) {
      const validatorPerformance =
        accountValidatorsPerformance[validatorData.validatorindex];

      return (
        <>
          {validatorPerformance
            ? validatorPerformance.attestationPerformance.missedAttestations
            : 0}
        </>
      );
    } else return <>0</>;
  };

  const getAttestationsRatio = (
    accountValidatorsPerformance: ValidatorsPerformance,
    validatorData: Validator,
  ) => {
    if (accountValidatorsPerformance) {
      const validatorPerformance =
        accountValidatorsPerformance[validatorData.validatorindex];

      return (
        <>
          {validatorPerformance
            ? (
                (validatorPerformance.attestationPerformance
                  .executedAttestations /
                  validatorPerformance.attestationPerformance
                    .attestationCount) *
                100
              ).toLocaleString()
            : 0}
        </>
      );
    } else return <>0</>;
  };

  const getValidatorRow = (
    validatorMap: ValidatorMap,
    validator: string,
    index: number,
  ) => {
    const validatorData = validatorMap[validator];
    return (
      <Fragment key={validator}>
        <tr>
          <td className={tableHeadStyle}>{`${index + 1}.`}</td>
          <td>
            <a
              href={`${consensys_explorer}/validator/${validator.substring(2)}`}
              target="_blank"
              rel="noreferrer"
              className="text-pastel-blue hover:underline overflow-hidden"
            >
              {`${validator.substring(0, 4)}...${validator.substring(
                validator.length - 2,
                validator.length,
              )}`}
            </a>
          </td>
          <td className={tableHeadStyle}>
            {validatorMap[validator].validatorindex}
          </td>
          <td className={tableHeadStyle}>
            {`${(validatorMap[validator].balance / 1e9).toLocaleString()}`}
          </td>
          <td className={tableHeadStyle}>
            {validatorData
              ? getExecutedAttestations(
                  validatorsPerformance[selectedAccount],
                  validatorData,
                )
              : 0}
          </td>
          <td className={tableHeadStyle}>
            {validatorData
              ? getMissedAttestations(
                  validatorsPerformance[selectedAccount],
                  validatorData,
                )
              : 0}
          </td>
          <td className={tableHeadStyle}>
            {validatorData
              ? getAttestationsRatio(
                  validatorsPerformance[selectedAccount],
                  validatorData,
                )
              : 0}
          </td>
          {findAddressName(validatorMap[validator].withdrawalcredentials)}
        </tr>
      </Fragment>
    );
  };

  /// ------ Styling Handling ------
  const tableHeadStyle = 'text-slate-gray px-4 py-1';

  const specificTileClasses = `${tileClasses} p-4`;
  /// ------------------------------

  return (
    <div className={bodyClasses}>
      {/* <!-- Tile 1: Select Validator Status Buttons --> */}
      <div
        className={`${specificTileClasses} text-center flex flex-col items-center`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">
          Select Validator Status
        </h2>
        <div>
          <button
            className={`${
              selectedValidatorStatus === 'active'
                ? 'bg-pastel-blue'
                : 'bg-strong-pink hover:bg-dark-pink'
            } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
            onClick={() => setSelectedValidatorStatus('active')}
          >
            Active
          </button>
          <button
            className={`${
              selectedValidatorStatus === 'pending'
                ? 'bg-pastel-blue'
                : 'bg-strong-pink hover:bg-dark-pink'
            } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
            onClick={() => setSelectedValidatorStatus('pending')}
          >
            Pending
          </button>
          <button
            className={`${
              selectedValidatorStatus === 'offline'
                ? 'bg-pastel-blue'
                : 'bg-strong-pink hover:bg-dark-pink'
            } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
            onClick={() => setSelectedValidatorStatus('offline')}
          >
            Offline
          </button>
          <button
            className={`${
              selectedValidatorStatus === 'slashed'
                ? 'bg-pastel-blue'
                : 'bg-strong-pink hover:bg-dark-pink'
            } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
            onClick={() => setSelectedValidatorStatus('slashed')}
          >
            Slashed
          </button>
          <button
            className={`${
              selectedValidatorStatus === 'other'
                ? 'bg-pastel-blue'
                : 'bg-strong-pink hover:bg-dark-pink'
            } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
            onClick={() => setSelectedValidatorStatus('other')}
          >
            Other
          </button>
        </div>
      </div>

      {/* <!-- Tile 1: Select Account Buttons --> */}
      <div
        className={`${specificTileClasses} text-center flex flex-col items-center`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">Select Account</h2>
        <div>
          {withdrawalAddresses.map((elem) => (
            <button
              key={elem.address}
              className={`${
                selectedAccount === elem.address
                  ? 'bg-pastel-blue'
                  : 'bg-strong-pink hover:bg-dark-pink'
              } text-white px-4 py-2 rounded-lg mb-2 m-2 transition-colors`}
              onClick={() => SetSelectedAccount(elem.address)}
            >
              {elem.name}
            </button>
          ))}
        </div>
      </div>

      {/* <!-- Tile 2: List of Ethereum Validators --> */}
      <div className={specificTileClasses}>
        <h2 className="text-pastel-blue text-2xl mb-4">Ethereum Validators</h2>
        <div className="overflow-x-scroll">
          <table className="table-auto break-words w-full text-center">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className={tableHeadStyle}>Nr.</th>
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
              {validators[selectedAccount] ? (
                validators[selectedAccount].map((validator, index) => {
                  switch (selectedValidatorStatus) {
                    case 'active': {
                      if (activeValidators[selectedAccount]) {
                        return getValidatorRow(
                          activeValidators[selectedAccount],
                          validator,
                          index,
                        );
                      }
                      break;
                    }
                    case 'pending': {
                      if (pendingValidators[selectedAccount]) {
                        return getValidatorRow(
                          pendingValidators[selectedAccount],
                          validator,
                          index,
                        );
                      }
                      break;
                    }
                    case 'offline': {
                      if (offlineValidators[selectedAccount]) {
                        return getValidatorRow(
                          offlineValidators[selectedAccount],
                          validator,
                          index,
                        );
                      }
                      break;
                    }
                    case 'slashed': {
                      if (slashedValidators[selectedAccount]) {
                        return getValidatorRow(
                          slashedValidators[selectedAccount],
                          validator,
                          index,
                        );
                      }
                      break;
                    }
                    case 'other': {
                      if (otherValidators[selectedAccount]) {
                        return getValidatorRow(
                          otherValidators[selectedAccount],
                          validator,
                          index,
                        );
                      }
                      break;
                    }
                  }
                  return <Fragment key={validator}></Fragment>;
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Validators;
