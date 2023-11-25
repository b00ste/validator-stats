import { FormEvent, Fragment } from 'react';

// types
import { WithdrawalAddress } from '../../Types/UsedDataTypes';

// constants
import { consensys_explorer } from '../../Helpers/constants';

interface Props {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationHeader: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  validators: Record<string, string[]>;
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  withdrawalAddresses: WithdrawalAddress[];
  setWithdrawalAddresses: React.Dispatch<
    React.SetStateAction<WithdrawalAddress[]>
  >;
}

const WithdrawalAddressesList: React.FC<Props> = ({
  setShowNotification,
  setNotificationHeader,
  validators,
  setValidators,
  withdrawalAddresses,
  setWithdrawalAddresses,
}) => {
  const handleAddressDelete = (addressToDelete: string) => {
    setShowNotification(true);
    setNotificationHeader('Address removed!');

    setWithdrawalAddresses(() =>
      withdrawalAddresses.filter(
        (publicKey) => publicKey.address !== addressToDelete,
      ),
    );

    setValidators({ ...validators, [addressToDelete]: [] });

    setTimeout(() => {
      setShowNotification(false);
      setNotificationHeader('');
    }, 1500);
  };

  const handleNameEdit = (event: FormEvent) => {
    event.preventDefault();
    alert('WIP');
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div slot="content" className="p-6">
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Saved Withdrawal Addresses
          </h2>
          <div className="overflow-scroll">
            <table className="table-auto w-max text-center">
              <thead>
                <tr className="border-b-2 border-lukso-70">
                  <th className="paragraph-inter-14-medium">Address</th>
                  <th className="paragraph-inter-14-medium">Name</th>
                  <th className="paragraph-inter-14-medium">
                    Validators Count
                  </th>
                  <th className="paragraph-inter-14-medium">Consensus</th>
                  <th className="paragraph-inter-14-medium"></th>
                  <th className="paragraph-inter-14-medium"></th>
                </tr>
              </thead>
              <tbody>
                {withdrawalAddresses ? (
                  withdrawalAddresses.map(({ address, name }) => (
                    <Fragment key={address}>
                      <tr>
                        <td className="px-4 py-1">
                          <a
                            href={`${consensys_explorer}/address/${address.substring(
                              2,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <lukso-username address={address} />
                          </a>
                        </td>
                        <td className="px-4 py-1 paragraph-inter-14-regular">
                          {name}
                        </td>
                        <td className="px-4 py-1 paragraph-inter-14-regular">
                          {validators[address].length}
                        </td>
                        <td className="px-4 py-1">
                          <a
                            href={`${consensys_explorer}/dashboard?validators=${
                              validators[address]
                                ? validators[address].toString()
                                : ''
                            }`}
                            target="_blank"
                            rel="noreferrer"
                            className="paragraph-inter-14-regular text-purple-41 hover:underline"
                          >
                            Dashboard
                          </a>
                        </td>
                        <td className="px-4 py-1">
                          <button
                            className="paragraph-inter-14-regular text-green-54 hover:text-green-45 transition-colors"
                            onClick={(event) => handleNameEdit(event)}
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-4 py-1">
                          <button
                            className="paragraph-inter-14-regular text-red-65 hover:text-red-55 transition-colors"
                            onClick={() => handleAddressDelete(address)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    </Fragment>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default WithdrawalAddressesList;
