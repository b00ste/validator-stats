import { fetchValidatorsPerformance } from '../Helpers/validators';
import { UpdateVaildatorsPerformance } from '../Types/HandlerTypes';

const updateVaildatorsPerformance: UpdateVaildatorsPerformance = (
  activeValidators,
  setValidatorsPerformance,
) => {
  let newValidatorsPerformance = fetchValidatorsPerformance(activeValidators);

  newValidatorsPerformance.then((data) => setValidatorsPerformance(data));
};

export default updateVaildatorsPerformance;
