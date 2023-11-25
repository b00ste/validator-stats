import {
  fetchValidatorsData,
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
} from '../Helpers/validators';
import { UpdateValidatorsMaps } from '../Types/HandlerTypes';

const updateValidatorsData: UpdateValidatorsMaps = (
  validators,
  setValidatorsData,
) => {
  const fetchedData = fetchValidatorsData(validators);

  fetchedData.then(
    ({
      activeValidators,
      pendingValidators,
      offlineValidators,
      slashedValidators,
      otherValidators,
    }) => {
      let newValidatorsLuck = fetchValidatorsLuck(activeValidators);
      let newValidatorsPerformance =
        fetchValidatorsPerformance(activeValidators);

      Promise.all([newValidatorsLuck, newValidatorsPerformance]).then(
        ([validatorsLuck, validatorsPerformance]) => {
          setValidatorsData({
            activeValidators,
            pendingValidators,
            offlineValidators,
            slashedValidators,
            otherValidators,
            validatorsLuck,
            validatorsPerformance,
          });
        },
      );
    },
  );
};

export default updateValidatorsData;
