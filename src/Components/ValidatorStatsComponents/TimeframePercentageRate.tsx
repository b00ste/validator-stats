// utils
import { useContext } from 'react';
import { getTimeframePercentageYield } from '../../Helpers/calculateStakingRewards';

// context
import { NetworkContext } from '../../App';

interface Props {
  timeframe: 'daily' | 'weekly' | 'monthly' | 'annual';
  activeBalance: number;
}

export const TimeframePercentageRate: React.FC<Props> = ({
  timeframe,
  activeBalance,
}) => {
  const { stakedLYX = 0 } = useContext(NetworkContext);

  let getTimeframeTitle = () => {
    switch (timeframe) {
      case 'daily': {
        return 'Daily Rate';
      }
      case 'weekly': {
        return 'Weekly Rate';
      }
      case 'monthly': {
        return 'Monthly Rate';
      }
      case 'annual': {
        return 'Annual Rate';
      }
    }
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center text-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-purple-31">
            {getTimeframeTitle()}
          </h2>
          <p className="paragraph-inter-14-medium">
            {`${getTimeframePercentageYield({
              totalAtStake: stakedLYX / 1e9,
              timeframe,
            }).toLocaleString()} %`}
          </p>

          <p className="paragraph-inter-12-medium">{`(Aproximate earnings: ${(
            (activeBalance / 1e9 / 100) *
            getTimeframePercentageYield({
              totalAtStake: stakedLYX / 1e9,
              timeframe,
            })
          ).toLocaleString()} LYX)`}</p>
        </div>
      </lukso-card>
    </div>
  );
};
