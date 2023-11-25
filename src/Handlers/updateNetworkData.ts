import { getLastEpoch } from '../Helpers/network';
import { UpdateNetworkData } from '../Types/HandlerTypes';

const updateNetworkData: UpdateNetworkData = (setNetworkData) => {
  const fetchedData = getLastEpoch();

  fetchedData.then(({ totalvalidatorbalance, epoch, validatorscount }) => {
    setNetworkData({
      stakedLYX: totalvalidatorbalance,
      currentEpoch: epoch,
      networkValidators: validatorscount,
    });
  });
};

export default updateNetworkData;
