import { fetchValidatorsLuck } from '../Helpers/validators';
import { UpdateVaildatorsLuck } from '../Types/HandlerTypes';

const updateVaildatorsLuck: UpdateVaildatorsLuck = (
  activeValidators,
  setValidatorsLuck,
) => {
  let newValidatorsLuck = fetchValidatorsLuck(activeValidators);

  newValidatorsLuck.then((data) => setValidatorsLuck(data));
};

export default updateVaildatorsLuck;
