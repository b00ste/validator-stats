import { getLYXPrice } from '../Helpers/network';
import { UpdateLYXPrice } from '../Types/HandlerTypes';

const updateLYXPrice: UpdateLYXPrice = (steLYXPrice) => {
  const fetchedPrices = getLYXPrice();

  fetchedPrices.then(({ eurPrice, usdPrice }) => {
    steLYXPrice({ eur: Number(eurPrice), usd: Number(usdPrice) });
  });
};

export default updateLYXPrice;
