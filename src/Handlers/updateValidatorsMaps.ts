import { fetchValidatorsData } from '../Helpers/validators';
import { UpdateValidatorsMaps } from '../Types/HandlerTypes';

const updateValidatorsMaps: UpdateValidatorsMaps = (
  validators,
  setActiveValidators,
  setPendingValidators,
  setOfflineValidators,
  setSlashedValidators,
  setOtherValidators,
) => {
  const fetchedData = fetchValidatorsData(validators);

  fetchedData.then((data) => {
    setActiveValidators(data.activeValidators);
    setPendingValidators(data.pendingValidators);
    setOfflineValidators(data.offlineValidators);
    setSlashedValidators(data.slashedValidators);
    setOtherValidators(data.otherValidators);
  });
};

export default updateValidatorsMaps;
