import { FormEvent, Fragment, useRef, useState } from 'react';

// Components
import Notification from '../Notification';

// Utils
import { generateUUID } from '../../Helpers/utils';

// theme
import { bodyClasses, buttonClasses, tileClasses } from '../../Theme/theme';

// Constants
import { consensys_explorer } from '../../Helpers/constants';

// Types
import { UserPageParams } from '../../Types/ComponentParamsTypes';
import {
  WithdrawalAddress,
  WithdrawalAddressesGroup,
} from '../../Types/UsedDataTypes';

const User = ({
  defaultPage,
  setDefaultPage,
  withdrawalAddresses,
  setWithdrawalAddresses,
  validators,
  setValidators,
  withdrawalAddressesGroups,
  setWithdrawalAddressessGroups,
}: UserPageParams) => {
  const [error, setError] = useState('');
  const [newGroup, setNewGroup] = useState([] as WithdrawalAddress[]);
  const [newGroupError, setNewGroupError] = useState('');

  /// ------ Notifications ------
  const [addressAddedOpacity, setAddressAddedOpacity] = useState(
    'opacity-0 pointer-events-none',
  );
  const [addressRemovedOpacity, setAddressRemovedOpacity] = useState(
    'opacity-0 pointer-events-none',
  );
  const [groupCreatedOpacity, setGroupCreatedOpacity] = useState(
    'opacity-0 pointer-events-none',
  );
  const [groupRemovedOpacity, setGroupRemovedOpacity] = useState(
    'opacity-0 pointer-events-none',
  );
  const [defaultPageChangedOpacity, setDefaultPageChangedOpacity] = useState(
    'opacity-0 pointer-events-none',
  );
  /// ---------------------------

  const addressRef = useRef<any>();
  const nameRef = useRef<any>();
  const groupNameRef = useRef<any>();
  const groupElementsRef = useRef<any>('choose');

  const handleAddressSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (nameRef.current.value.length === 0) {
      setError('Please set a name');
      return;
    }

    if (
      !addressRef.current.value.startsWith('0x') ||
      addressRef.current.value.length !== 42
    ) {
      setError('Please set a valid address');
      return;
    }

    if (
      withdrawalAddresses
        .map((elem) => elem.address)
        .includes(addressRef.current.value)
    ) {
      setError('Addres already exists');
      return;
    }

    setAddressAddedOpacity('opacity-100');

    setWithdrawalAddresses([
      ...withdrawalAddresses,
      {
        address: addressRef.current.value,
        name: nameRef.current.value,
      },
    ]);

    addressRef.current.value = '';
    nameRef.current.value = '';
    setError('');

    setTimeout(
      () => setAddressAddedOpacity('opacity-0 pointer-events-none'),
      1500,
    );
  };

  const handleAddressDelete = (addressToDelete: string) => {
    setAddressRemovedOpacity('opacity-100');

    setWithdrawalAddresses(() =>
      withdrawalAddresses.filter(
        (publicKey) => publicKey.address !== addressToDelete,
      ),
    );

    setValidators({ ...validators, [addressToDelete]: [] });

    setTimeout(
      () => setAddressRemovedOpacity('opacity-0 pointer-events-none'),
      1500,
    );
  };

  const handleNameEdit = (event: FormEvent) => {
    event.preventDefault();
    alert('WIP');
  };

  const handleCreateGroupChange = () => {
    if (groupElementsRef.current.value !== 'choose address') {
      if (!newGroup.includes(groupElementsRef.current.value)) {
        const updatedGroup = [
          ...newGroup,
          withdrawalAddresses.filter(
            (elem) => groupElementsRef.current.value === elem.name,
          )[0],
        ];

        setNewGroup(updatedGroup);

        groupElementsRef.current.value = 'choose address';
      }
    }
  };

  const handleAddressRemovalFromNewGroup = (
    elemToRemove: WithdrawalAddress,
  ) => {
    if (newGroup.includes(elemToRemove)) {
      const updatedGroup = newGroup.filter(
        (elem) => elem.address !== elemToRemove.address,
      );

      setNewGroup(updatedGroup);
    }
  };

  const handleCreateGroupSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (groupNameRef.current.value.length === 0) {
      setNewGroupError('Please set a group name.');
      return;
    }

    if (newGroup.length === 0) {
      setNewGroupError('Please choose addresses for the new group.');
      return;
    }

    setGroupCreatedOpacity('opacity-100');

    const newWithdrawalAddressesGroup = [
      ...withdrawalAddressesGroups,
      {
        name: groupNameRef.current.value,
        withdrawalAddresses: newGroup,
        key: generateUUID(),
      },
    ];
    setWithdrawalAddressessGroups(newWithdrawalAddressesGroup);

    setNewGroup([]);
    groupNameRef.current.value = '';
    groupElementsRef.current.value = 'choose address';

    setTimeout(
      () => setGroupCreatedOpacity('opacity-0 pointer-events-none'),
      1500,
    );
  };

  const handleGroupRemoval = (
    event: FormEvent,
    groupToRemove: WithdrawalAddressesGroup,
  ) => {
    event.preventDefault();

    if (groupToRemove.name === 'Main') {
      return;
    }

    setGroupRemovedOpacity('opacity-100');

    const newWithdrawalAddressesGroup = withdrawalAddressesGroups.filter(
      (group) => group !== groupToRemove,
    );
    setWithdrawalAddressessGroups(newWithdrawalAddressesGroup);

    setTimeout(
      () => setGroupRemovedOpacity('opacity-0 pointer-events-none'),
      1500,
    );
  };

  const handleGroupEdit = (event: FormEvent) => {
    event.preventDefault();
    alert('WIP');
  };

  const handleDefaultPageChange = (
    pageName: '/home' | '/validatorStatistics' | '/validatorList' | '/user',
  ) => {
    if (pageName !== defaultPage) {
      setDefaultPage(pageName);
    }
  };

  const handleDefaultPageSelect = (event: React.MouseEvent) => {
    event.preventDefault();
    setDefaultPageChangedOpacity('opacity-100');

    localStorage.setItem('defaultPage', defaultPage);

    setTimeout(
      () => setDefaultPageChangedOpacity('opacity-0 pointer-events-none'),
      1500,
    );
  };

  /// ------ Styling Handling ------
  const tableHeadClasses = 'text-slate-gray px-4 py-1 w-max font-extrabold';

  const textInputClasses =
    'w-full rounded-lg py-2 px-3 text-slate-gray focus:outline-none focus:border-pastel-blue text-center border-2 border-lavender-pink';

  const checkboxLabelClasses = 'ml-4 text-xl';

  const additionalButtonClasses = 'w-full';

  const specificTileClasses = `${tileClasses} p-4`;
  /// ------------------------------

  return (
    <div className={`${bodyClasses} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
      {/* <!-- Tile 1: Add Address Form --> */}
      <div
        className={`${specificTileClasses} text-center flex flex-col items-center justify-evenly`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">
          Add Withdrawal Address
        </h2>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="ethAddress"
              className="block text-slate-gray text-sm font-bold mb-2"
            >
              Withdrawal Address:
            </label>
            <input
              type="text"
              id="ethAddress"
              name="ethAddress"
              placeholder="Address"
              className={textInputClasses}
              ref={addressRef}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-slate-gray text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className={textInputClasses}
              ref={nameRef}
            />
          </div>
          <button
            type="submit"
            className={`${buttonClasses} ${additionalButtonClasses}`}
            onClick={(event) => handleAddressSubmit(event)}
          >
            Add Address
          </button>
        </form>
        {error ? <p className="text-pastel-red font-bold">{error}</p> : ''}
        <Notification
          notificationDescription="New address added!"
          opacity={addressAddedOpacity}
        />
      </div>

      {/* <!-- Tile 2: List of Saved Addresses --> */}
      <div
        className={`${specificTileClasses} col-span-1 sm:col-span-2 overflow-scroll`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">
          Saved Withdrawal Addresses
        </h2>
        <div className="overflow-x-scroll">
          <table className="table-auto w-max text-center">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className={tableHeadClasses}>Address</th>
                <th className={tableHeadClasses}>Name</th>
                <th className={tableHeadClasses}>Validators Count</th>
                <th className={tableHeadClasses}>Consensus</th>
                <th className={tableHeadClasses}></th>
                <th className={tableHeadClasses}></th>
              </tr>
            </thead>
            <tbody>
              {withdrawalAddresses ? (
                withdrawalAddresses.map((withdrawalAddress) => (
                  <Fragment key={withdrawalAddress.address}>
                    <tr>
                      <td className="px-4 py-1">
                        <a
                          href={`${consensys_explorer}/address/${withdrawalAddress.address.substring(
                            2,
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-pastel-blue hover:underline"
                        >
                          {`${withdrawalAddress.address.substring(
                            0,
                            4,
                          )}...${withdrawalAddress.address.substring(
                            withdrawalAddress.address.length - 2,
                            withdrawalAddress.address.length,
                          )}`}
                        </a>
                      </td>
                      <td className="px-4 py-1 text-slate-gray">
                        {withdrawalAddress.name}
                      </td>
                      <td className="px-4 py-1 text-slate-gray">
                        {validators[withdrawalAddress.address].length}
                      </td>
                      <td className="px-4 py-1">
                        <a
                          href={`${consensys_explorer}/dashboard?validators=${
                            validators[withdrawalAddress.address]
                              ? validators[withdrawalAddress.address].toString()
                              : ''
                          }`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-pastel-blue hover:underline"
                        >
                          Dashboard
                        </a>
                      </td>
                      <td className="px-4 py-1">
                        <button
                          className="text-pastel-green hover:text-green-500 transition-colors"
                          onClick={(event) => handleNameEdit(event)}
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-4 py-1">
                        <button
                          className="text-pastel-red hover:text-red-600 transition-colors"
                          onClick={() =>
                            handleAddressDelete(withdrawalAddress.address)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </Fragment>
                ))
              ) : (
                <Fragment></Fragment>
              )}
            </tbody>
          </table>
        </div>
        <Notification
          notificationDescription="Address removed!"
          opacity={addressRemovedOpacity}
        />
      </div>

      {/* <!-- Tile 3: New Withdrawal Addresses Group --> */}
      <div
        className={`${specificTileClasses} text-center flex flex-col items-center justify-evenly`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">
          Create Groups of Withdrawal Addresses
        </h2>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="groupName"
              className="block text-slate-gray text-sm font-bold mb-2"
            >
              Group name:
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              placeholder="Group name"
              className={textInputClasses}
              ref={groupNameRef}
            />
          </div>
          <div className="mb-4">
            {newGroup.map((elem) => (
              <Fragment key={elem.address}>
                <div className="inline-block bg-soft-pink px-4 py-2 m-2 rounded-xl border-2 border-lavender-pink">
                  <p className="inline-block text-slate-gray">{elem.name}</p>
                  <span
                    className="ml-2 font-extrabold hover:cursor-pointer hover:opacity-70"
                    onClick={() => handleAddressRemovalFromNewGroup(elem)}
                  >
                    X
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="mb-4">
            <label htmlFor="withdawalAddressesList" className="block mb-4">
              {newGroup.length === 0
                ? 'Add a withdrawal address to the group'
                : 'Add another withdrawal address to the group'}
            </label>
            <select
              name="withdawalAddressesList"
              ref={groupElementsRef}
              onChange={() => handleCreateGroupChange()}
              defaultValue="choose address"
              className="appearance-none px-4 py-2 rounded-xl bg-soft-pink focus:outline-none hover:cursor-pointer hover:bg-lavender-pink transition-colors border-2 border-lavender-pink"
            >
              <option value="choose address">Choose address</option>
              {withdrawalAddresses
                .filter((elem) => !newGroup.includes(elem))
                .map((withdrawalAddress) => (
                  <Fragment key={withdrawalAddress.address}>
                    <option value={withdrawalAddress.name}>
                      {withdrawalAddress.name}
                    </option>
                  </Fragment>
                ))}
            </select>
          </div>
          <button
            type="submit"
            className={`${buttonClasses} ${additionalButtonClasses}`}
            onClick={(event) => handleCreateGroupSubmit(event)}
          >
            Create Group
          </button>
        </form>
        {newGroupError ? (
          <p className="text-pastel-red font-bold">{newGroupError}</p>
        ) : (
          ''
        )}
        <Notification
          notificationDescription="New group created!"
          opacity={groupCreatedOpacity}
        />
      </div>

      {/* <!-- Tile 4: List of Withdrawal Address Groups --> */}
      <div
        className={`${specificTileClasses} col-span-1 sm:col-span-2 overflow-scroll`}
      >
        <h2 className="text-pastel-blue text-2xl mb-4">
          Groups of Withdrawal Addresses
        </h2>
        <div className="overflow-x-scroll">
          <table className="table-auto w-max text-center">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className={tableHeadClasses}>Name</th>
                <th className={tableHeadClasses}>Withdrawal Addresses</th>
                <th className={tableHeadClasses}></th>
                <th className={tableHeadClasses}></th>
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
                    <td className="px-4 py-1">{group.name}</td>
                    <td className="px-4 py-1 text-slate-gray grid grid-cols-3 w-max">
                      {group.withdrawalAddresses ? (
                        group.withdrawalAddresses.map((elem) => (
                          <Fragment key={elem.address}>
                            <p className="px-2 py-1 m-1 bg-soft-pink rounded-lg border-2 border-lavender-pink w-max">
                              {elem.name}
                            </p>
                          </Fragment>
                        ))
                      ) : (
                        <Fragment></Fragment>
                      )}
                    </td>
                    <td className="px-4 py-1">
                      {group.name !== 'Main' ? (
                        <button
                          className="text-pastel-green hover:text-green-500 transition-colors w-"
                          onClick={(event) => handleGroupEdit(event)}
                        >
                          Edit
                        </button>
                      ) : (
                        'Cannot edit Main Group'
                      )}
                    </td>
                    <td className="px-4 py-1">
                      {group.name !== 'Main' ? (
                        <button
                          className="text-pastel-red hover:text-red-600 transition-colors"
                          onClick={(event) => handleGroupRemoval(event, group)}
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
        <Notification
          notificationDescription="Group removed!"
          opacity={groupRemovedOpacity}
        />
      </div>

      {/* <!-- Tile 5: Set default starting page --> */}
      <div className={`${specificTileClasses} col-span-1`}>
        <h2 className="text-pastel-blue text-2xl mb-4">
          Default starting page
        </h2>
        <form className="w-full max-w-md">
          <div className="pb-4">
            <div>
              <input
                type="checkbox"
                id="/home"
                checked={'/home' === defaultPage}
                onChange={() => handleDefaultPageChange('/home')}
              />
              <label className={checkboxLabelClasses} htmlFor="/home">
                Home
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="/validatorStatistics"
                checked={'/validatorStatistics' === defaultPage}
                onChange={() => handleDefaultPageChange('/validatorStatistics')}
              />
              <label
                className={checkboxLabelClasses}
                htmlFor="/validatorStatistics"
              >
                Validator Statistics
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="/validatorList"
                checked={'/validatorList' === defaultPage}
                onChange={() => handleDefaultPageChange('/validatorList')}
              />
              <label className={checkboxLabelClasses} htmlFor="/validatorList">
                Validator List
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="user"
                checked={'/user' === defaultPage}
                onChange={() => handleDefaultPageChange('/user')}
              />
              <label className={checkboxLabelClasses} htmlFor="user">
                User
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className={`${buttonClasses} ${additionalButtonClasses}`}
              onClick={(event) => handleDefaultPageSelect(event)}
            >
              Select
            </button>
            <Notification
              notificationDescription="Default page updated!"
              opacity={defaultPageChangedOpacity}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
