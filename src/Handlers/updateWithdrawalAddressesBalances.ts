import { getWithdrawalAddressesBalance } from '../Helpers/network';
import { UpdateWithdrawalAddressesBalances } from '../Types/HandlerTypes';

const updateWithdrawalAddressesBalances: UpdateWithdrawalAddressesBalances = (
  withdrawalAddresses,
  setWithdrawalAddressessBalances,
) => {
  const newWithdrawalAddressesBalance =
    getWithdrawalAddressesBalance(withdrawalAddresses);

  newWithdrawalAddressesBalance.then((data) =>
    setWithdrawalAddressessBalances(data),
  );
};

export default updateWithdrawalAddressesBalances;
