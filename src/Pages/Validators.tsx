import { Fragment, ReactElement, useContext, useState } from 'react';

// utils
import { consensys_explorer } from '../Helpers/constants';

// types
import {
  WithdrawalAddress,
  ValidatorMap,
  ValidatorsPerformance,
} from '../Types/UsedDataTypes';
import { Validator } from '../Types/FetchedDataTypes';

// context
import { ValidatorsDataContext } from '../App';

interface Props {
  withdrawalAddresses: WithdrawalAddress[];
}

export const Validators: React.FC<Props> = ({ withdrawalAddresses }) => {
  const {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
    validatorsPerformance,
  } = useContext(ValidatorsDataContext);

  const [selectedValidatorStatus, setSelectedValidatorStatus] = useState(
    'active' as 'active' | 'pending' | 'offline' | 'slashed' | 'other',
  );
  const [selectedAccount, SetSelectedAccount] = useState(
    withdrawalAddresses[0] ? withdrawalAddresses[0].address : '',
  );

  const findAddressName = (bytes: string) => {
    if (bytes.startsWith('0x01')) {
      const address = `0x${bytes.substring(bytes.length - 40)}`;

      const withdrawalAddress = withdrawalAddresses.filter(
        (elem) => elem.address.toLowerCase() === address.toLowerCase(),
      )[0];

      return (
        <td className="px-2 py paragraph-inter-14-regular" key={address}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
          >
            {withdrawalAddress ? withdrawalAddress.name : 'Name not found!'}
          </a>
        </td>
      );
    } else if (bytes.startsWith('0x00')) {
      const address = `0x${'00'.repeat(20)}`;

      const withdrawalAddress = withdrawalAddresses.filter(
        (elem) => elem.address.toLowerCase() === address.toLowerCase(),
      )[0];

      return (
        <td className="px-2 paragraph-inter-14-regular" key={address}>
          <a
            href={`${consensys_explorer}/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-pastel-blue hover:underline overflow-hidden"
          >
            {withdrawalAddress ? withdrawalAddress.name : 'Name not found!'}
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

  const getValidatorRows = () => {
    let validatorMap: ValidatorMap;

    switch (selectedValidatorStatus) {
      case 'active': {
        validatorMap = activeValidators
          ? activeValidators[selectedAccount]
          : {};
        break;
      }
      case 'pending': {
        validatorMap = pendingValidators
          ? pendingValidators[selectedAccount]
          : {};
        break;
      }
      case 'offline': {
        validatorMap = offlineValidators
          ? offlineValidators[selectedAccount]
          : {};
        break;
      }
      case 'slashed': {
        validatorMap = slashedValidators
          ? slashedValidators[selectedAccount]
          : {};
        break;
      }
      case 'other': {
        validatorMap = otherValidators ? otherValidators[selectedAccount] : {};
        break;
      }
    }

    const rows: ReactElement[] = [];

    let index = 1;
    for (const validator in validatorMap) {
      const validatorData = validatorMap[validator];

      rows.push(
        <Fragment key={validator}>
          <tr>
            <td className="px-2 paragraph-inter-14-regular">{`${index}.`}</td>
            <td className="px-2">
              <a
                href={`${consensys_explorer}/validator/${validator.substring(
                  2,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <lukso-username address={validator} />
              </a>
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {validatorData ? validatorData.validatorindex : 0}
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {`${(validatorData
                ? validatorData.balance / 1e9
                : 0
              ).toLocaleString()}`}
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {validatorData
                ? (validatorData.total_withdrawals / 1e9).toLocaleString()
                : 0}
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {validatorData
                ? getExecutedAttestations(
                    validatorsPerformance
                      ? validatorsPerformance[selectedAccount]
                      : {},
                    validatorData,
                  )
                : 0}
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {validatorData
                ? getMissedAttestations(
                    validatorsPerformance
                      ? validatorsPerformance[selectedAccount]
                      : {},
                    validatorData,
                  )
                : 0}
            </td>
            <td className="px-2 paragraph-inter-14-regular">
              {validatorData
                ? getAttestationsRatio(
                    validatorsPerformance
                      ? validatorsPerformance[selectedAccount]
                      : {},
                    validatorData,
                  )
                : 0}
            </td>
            {findAddressName(
              validatorData ? validatorData.withdrawalcredentials : '0x00',
            )}
          </tr>
        </Fragment>,
      );

      index++;
    }

    return rows;
  };

  /// ------ Styling Handling ------
  const tableHeadStyle = 'text-slate-gray px-4 py-1 break-keep';

  return (
    <>
      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div
            slot="content"
            className="p-6 flex flex-col items-center justify-center"
          >
            <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
              Select Validator Status
            </h2>
            <div className="flex flex-wrap items-center justify-center">
              <lukso-button
                variant={
                  selectedValidatorStatus === 'active' ? 'primary' : 'landing'
                }
                onClick={() => setSelectedValidatorStatus('active')}
                custom-class="m-2"
              >
                Active
              </lukso-button>
              <lukso-button
                variant={
                  selectedValidatorStatus === 'pending' ? 'primary' : 'landing'
                }
                onClick={() => setSelectedValidatorStatus('pending')}
                custom-class="m-2"
              >
                Pending
              </lukso-button>
              <lukso-button
                variant={
                  selectedValidatorStatus === 'offline' ? 'primary' : 'landing'
                }
                onClick={() => setSelectedValidatorStatus('offline')}
                custom-class="m-2"
              >
                Offline
              </lukso-button>
              <lukso-button
                variant={
                  selectedValidatorStatus === 'slashed' ? 'primary' : 'landing'
                }
                onClick={() => setSelectedValidatorStatus('slashed')}
                custom-class="m-2"
              >
                Slashed
              </lukso-button>
              <lukso-button
                variant={
                  selectedValidatorStatus === 'other' ? 'primary' : 'landing'
                }
                onClick={() => setSelectedValidatorStatus('other')}
              >
                Other
              </lukso-button>
            </div>
          </div>
        </lukso-card>
      </div>

      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div
            slot="content"
            className="p-6 flex flex-col items-center justify-center"
          >
            <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
              Select Account
            </h2>
            <div className="flex flex-wrap items-center justify-center">
              {withdrawalAddresses.map((elem) => (
                <lukso-button
                  key={elem.address}
                  variant={
                    selectedAccount === elem.address ? 'primary' : 'landing'
                  }
                  onClick={() => SetSelectedAccount(elem.address)}
                  custom-class="m-2"
                >
                  {elem.name}
                </lukso-button>
              ))}
            </div>
          </div>
        </lukso-card>
      </div>

      <div className="m-4">
        <lukso-card variant="basic" size="medium">
          <div slot="content" className="p-6 flex flex-col">
            <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
              LUKSO Validators
            </h2>
            <div className="overflow-scroll">
              <table className="table-auto break-words w-full text-center">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="paragraph-inter-14-medium px-2">Nr.</th>
                    <th className="paragraph-inter-14-medium px-2">Address</th>
                    <th className="paragraph-inter-14-medium px-2">Index</th>
                    <th className="paragraph-inter-14-medium px-2">
                      Balance (LYX)
                    </th>
                    <th className="paragraph-inter-14-medium px-2">
                      Income (LYX)
                    </th>
                    <th className="paragraph-inter-14-medium px-2">
                      Executed Attestations
                    </th>
                    <th className="paragraph-inter-14-medium px-2">
                      Missed Attestations
                    </th>
                    <th className="paragraph-inter-14-medium px-2">
                      Performance
                    </th>
                    <th className="paragraph-inter-14-medium px-2">
                      Withdrawal Address
                    </th>
                  </tr>
                </thead>
                <tbody>{getValidatorRows()}</tbody>
              </table>
            </div>
          </div>
        </lukso-card>
      </div>
    </>
  );
};

export default Validators;
