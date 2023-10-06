import { fetchValidators } from '../Helpers/validators';
import { WithdrawalAddresses } from '../Types/UsedDataTypes';

const updateValidator = (
  withdrawalAddresses: WithdrawalAddresses[],
  setValidators: React.Dispatch<React.SetStateAction<Record<string, string[]>>>,
) => {
  const validators = fetchValidators(withdrawalAddresses);

  validators.then((data) => setValidators(data));
};

export default updateValidator;
