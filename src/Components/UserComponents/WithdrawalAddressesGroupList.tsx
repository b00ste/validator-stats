import { FormEvent, Fragment } from 'react';
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

interface Props {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationHeader: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  setWithdrawalAddressessGroups: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup[]>
  >;
}

const WithdrawalAddressesGroupList: React.FC<Props> = ({
  setShowNotification,
  setNotificationHeader,
  withdrawalAddressesGroups,
  setWithdrawalAddressessGroups,
}) => {
  const handleGroupRemoval = (
    event: FormEvent,
    groupToRemove: WithdrawalAddressesGroup,
  ) => {
    event.preventDefault();

    if (groupToRemove.name === 'Main') {
      return;
    }

    setShowNotification(true);
    setNotificationHeader('Group removed!');

    const newWithdrawalAddressesGroup = withdrawalAddressesGroups.filter(
      (group) => group !== groupToRemove,
    );
    setWithdrawalAddressessGroups(newWithdrawalAddressesGroup);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationHeader(undefined);
    }, 1500);
  };

  const handleGroupEdit = (event: FormEvent) => {
    event.preventDefault();
    alert('WIP');
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div slot="content" className="p-6">
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Groups of Withdrawal Addresses
          </h2>
          <div className="overflow-scroll">
            <table className="table-auto w-max text-center">
              <thead>
                <tr className="border-b-2 border-lukso-70">
                  <th className="paragraph-inter-14-medium">Name</th>
                  <th className="paragraph-inter-14-medium">
                    Withdrawal Addresses
                  </th>
                  <th className="paragraph-inter-14-medium"></th>
                  <th className="paragraph-inter-14-medium"></th>
                </tr>
              </thead>
              <tbody>
                {withdrawalAddressesGroups.map((group) => (
                  <Fragment key={group.key}>
                    <tr
                      key={group.withdrawalAddresses
                        .map((elem) => elem.address)
                        .toString()}
                    >
                      <td className="px-4 py-1 paragraph-inter-14-regular">
                        {group.name}
                      </td>
                      <td className="px-4 py-1 text-slate-gray grid grid-cols-3 w-max">
                        {group.withdrawalAddresses ? (
                          group.withdrawalAddresses.map((elem) => (
                            <div className="m-1" key={elem.address}>
                              <lukso-tag
                                size="large"
                                background-color="purple-82"
                              >
                                {elem.name}
                              </lukso-tag>
                            </div>
                          ))
                        ) : (
                          <Fragment></Fragment>
                        )}
                      </td>
                      <td className="px-4 py-1 paragraph-inter-14-regular">
                        {group.name !== 'Main' ? (
                          <button
                            className="text-green-54 hover:text-green-45 transition-colors"
                            onClick={(event) => handleGroupEdit(event)}
                          >
                            Edit
                          </button>
                        ) : (
                          'Cannot edit Main Group'
                        )}
                      </td>
                      <td className="px-4 py-1 paragraph-inter-14-regular">
                        {group.name !== 'Main' ? (
                          <button
                            className="text-red-65 hover:text-red-55 transition-colors"
                            onClick={(event) =>
                              handleGroupRemoval(event, group)
                            }
                          >
                            Remove
                          </button>
                        ) : (
                          'Cannot remove Main Group'
                        )}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default WithdrawalAddressesGroupList;
