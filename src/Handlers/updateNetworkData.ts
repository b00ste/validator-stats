import { getLastEpoch } from '../Helpers/network';
import { UpdateNetworkData } from '../Types/HandlerTypes';

const updateNetworkData: UpdateNetworkData = (
  setStakedLYX,
  setCurrentEpoch,
  setNetworkValidators,
) => {
  const fetchedData = getLastEpoch();

  fetchedData.then((epochData) => {
    setStakedLYX(epochData.totalvalidatorbalance);
    setCurrentEpoch(epochData.epoch);
    setNetworkValidators(epochData.validatorscount);
  });
};

export default updateNetworkData;
