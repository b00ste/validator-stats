import { fetchValidators } from '../Helpers/validators';
import { UpdateValidator } from '../Types/HandlerTypes';

const updateValidator: UpdateValidator = (
  withdrawalAddresses,
  setValidators,
) => {
  const validators = fetchValidators(withdrawalAddresses);

  validators.then((data) => setValidators(data));
};

export default updateValidator;
