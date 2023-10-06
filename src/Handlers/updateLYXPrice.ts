import { getLYXPrice } from '../Helpers/network';
import { UpdateLYXPrice } from '../Types/HandlerTypes';

const updateLYXPrice: UpdateLYXPrice = (setEurPrce, setUsdPrce) => {
  const fetchedPrices = getLYXPrice();

  fetchedPrices.then((data) => {
    setEurPrce(data.eurPrice);
    setUsdPrce(data.usdPrice);
  });
};

export default updateLYXPrice;
