import { useState } from 'react';

// Components
import Error from '../Components/Error';
import Notification from '../Components/Notification';
import WithdrawalAddressesForm from '../Components/UserComponents/WithdrawalAddressesForm';
import WithdrawalAddressesList from '../Components/UserComponents/WithdrawalAddressesList';
import WithdrawalAddressesGroupForm from '../Components/UserComponents/WithdrawalAddressesGroupForm';
import WithdrawalAddressesGroupList from '../Components/UserComponents/WithdrawalAddressesGroupList';
import DefaultStartingPage from '../Components/UserComponents/DefaultStartingPage';

// Types
import {
  WithdrawalAddress,
  WithdrawalAddressesGroup,
} from '../Types/UsedDataTypes';

interface Props {
  withdrawalAddresses: WithdrawalAddress[];
  setWithdrawalAddresses: React.Dispatch<
    React.SetStateAction<WithdrawalAddress[]>
  >;
  validators: Record<string, string[]>;
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  defaultPage: string;
  setDefaultPage: React.Dispatch<
    React.SetStateAction<
      '/home' | '/validatorStatistics' | '/validatorList' | '/user'
    >
  >;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  setWithdrawalAddressessGroups: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup[]>
  >;
}

const User: React.FC<Props> = ({
  defaultPage,
  setDefaultPage,
  withdrawalAddresses,
  setWithdrawalAddresses,
  validators,
  setValidators,
  withdrawalAddressesGroups,
  setWithdrawalAddressessGroups,
}) => {
  const [error, setError] = useState<string>();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationHeader, setNotificationHeader] = useState<string>();

  return (
    <>
      {/* <!-- Tile 1: Add Address Form --> */}
      <WithdrawalAddressesForm
        setError={setError}
        setShowNotification={setShowNotification}
        setNotificationHeader={setNotificationHeader}
        withdrawalAddresses={withdrawalAddresses}
        setWithdrawalAddresses={setWithdrawalAddresses}
      />

      {/* <!-- Tile 2: List of Saved Addresses --> */}
      <WithdrawalAddressesList
        setShowNotification={setShowNotification}
        setNotificationHeader={setNotificationHeader}
        validators={validators}
        setValidators={setValidators}
        withdrawalAddresses={withdrawalAddresses}
        setWithdrawalAddresses={setWithdrawalAddresses}
      />

      {/* <!-- Tile 3: New Withdrawal Addresses Group --> */}
      <WithdrawalAddressesGroupForm
        setError={setError}
        setShowNotification={setShowNotification}
        setNotificationHeader={setNotificationHeader}
        withdrawalAddresses={withdrawalAddresses}
        withdrawalAddressesGroups={withdrawalAddressesGroups}
        setWithdrawalAddressessGroups={setWithdrawalAddressessGroups}
      />

      {/* <!-- Tile 4: List of Withdrawal Address Groups --> */}
      <WithdrawalAddressesGroupList
        setShowNotification={setShowNotification}
        setNotificationHeader={setNotificationHeader}
        withdrawalAddressesGroups={withdrawalAddressesGroups}
        setWithdrawalAddressessGroups={setWithdrawalAddressessGroups}
      />

      {/* <!-- Tile 5: Set default starting page --> */}
      <DefaultStartingPage
        setShowNotification={setShowNotification}
        setNotificationHeader={setNotificationHeader}
        defaultPage={defaultPage}
        setDefaultPage={setDefaultPage}
      />

      {error ? <Error error={error} setError={setError} /> : <></>}
      {showNotification ? (
        <Notification notificationHeader={notificationHeader || ''} />
      ) : (
        <></>
      )}
    </>
  );
};

export default User;
