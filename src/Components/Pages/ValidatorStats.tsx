import { useEffect, useState } from 'react';

// Stats Tiles
import { Earnings } from '../ValidatorStatsComponents/Earnings';
import { Attestations } from '../ValidatorStatsComponents/Attestations';
import { Luck } from '../ValidatorStatsComponents/Luck';
import { Validators } from '../ValidatorStatsComponents/Validators';
import { Balance } from '../ValidatorStatsComponents/Balance';
import { TotalWithdrawals } from '../ValidatorStatsComponents/TotalWithdrawals';
import { WithdrawalBalance } from '../ValidatorStatsComponents/WithdrawalBalance';
import { WithdrawableAmount } from '../ValidatorStatsComponents/WithdrawableAmount';
// import { TimeframePercentageRate } from '../ValidatorStatsComponents/TimeframePercentageRate';

// ts types
import { ValidatorStatsPageParams } from '../../Types/ComponentParamsTypes';
import { ValidatorMap } from '../../Types/UsedDataTypes';
import { bodyClasses, tileClasses } from '../../Theme/theme';

const ValidatorStats = ({
  stakedLYX,
  tokenPrice,
  validatorsData: { validatorsMaps, validatorsLuck, validatorsPerformance },
  withdrawalAddressesGroups,
  withdrawalAddressesBalance,
}: ValidatorStatsPageParams) => {
  const {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  } = validatorsMaps;
  const [selectedGroup, setSelectedGroup] = useState(
    withdrawalAddressesGroups[0],
  );

  const [activeValidatorsCount, setActiveValidatorsCount] = useState(0);
  const [pendingValidatorsCount, setPendingValidatorsCount] = useState(0);
  const [offlineValidatorsCount, setOfflineValidatorsCount] = useState(0);
  const [slashedValidatorsCount, setSlashedValidatorsCount] = useState(0);
  const [otherValidatorsCount, setOtherValidatorsCount] = useState(0);

  useEffect(() => {
    const calculateValidatorsCount = (
      validatorsMap: Record<string, ValidatorMap>,
    ) => {
      let total = 0;

      for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
        const withdrawalAddress = selectedGroup.withdrawalAddresses[i].address;

        if (validatorsMap[withdrawalAddress]) {
          total += Object.getOwnPropertyNames(
            validatorsMap[withdrawalAddress],
          ).length;
        }
      }

      return total;
    };

    let newActiveValidatorsCount = calculateValidatorsCount(activeValidators);
    setActiveValidatorsCount(newActiveValidatorsCount);

    let newPendingValidatorsCount = calculateValidatorsCount(pendingValidators);
    setPendingValidatorsCount(newPendingValidatorsCount);

    let newOfflineValidatorsCount = calculateValidatorsCount(offlineValidators);
    setOfflineValidatorsCount(newOfflineValidatorsCount);

    let newSlashedValidatorsCount = calculateValidatorsCount(slashedValidators);
    setSlashedValidatorsCount(newSlashedValidatorsCount);

    let newOtherValidatorsCount = calculateValidatorsCount(otherValidators);
    setOtherValidatorsCount(newOtherValidatorsCount);
  }, [
    selectedGroup,
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  ]);

  const [activeBalance, setActiveBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [offlineBalance, setOfflineBalance] = useState(0);
  const [slashedBalance, setSlashedBalance] = useState(0);
  const [otherBalance, setOtherBalance] = useState(0);

  useEffect(() => {
    const calculateValidatorsBalance = (
      validatorsMap: Record<string, ValidatorMap>,
    ) => {
      let balance = 0;

      for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
        const withdrawalAddress = selectedGroup.withdrawalAddresses[i].address;

        if (validatorsMap[withdrawalAddress]) {
          for (const validator in validatorsMap[withdrawalAddress]) {
            balance += validatorsMap[withdrawalAddress][validator].balance;
          }
        }
      }

      return balance;
    };

    let newActiveBalance = calculateValidatorsBalance(activeValidators);
    setActiveBalance(newActiveBalance);

    let newPendingBalance = calculateValidatorsBalance(pendingValidators);
    setPendingBalance(newPendingBalance);

    let newOfflineBalance = calculateValidatorsBalance(offlineValidators);
    setOfflineBalance(newOfflineBalance);

    let newSlashedBalance = calculateValidatorsBalance(slashedValidators);
    setSlashedBalance(newSlashedBalance);

    let newOtherBalance = calculateValidatorsBalance(otherValidators);
    setOtherBalance(newOtherBalance);
  }, [
    selectedGroup,
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  ]);

  /// ------ Styling Handling ------
  const specificTileClasses = `${tileClasses} text-center p-2 flex flex-col items-center justify-evenly`;
  /// ------------------------------

  const validatorsCount = {
    activeValidatorsCount,
    pendingValidatorsCount,
    offlineValidatorsCount,
    slashedValidatorsCount,
    otherValidatorsCount,
  };
  const validatorsBalances = {
    activeBalance,
    pendingBalance,
    offlineBalance,
    slashedBalance,
    otherBalance,
  };

  return (
    <div className={`${bodyClasses} sm:grid-cols-2 md:grid-cols-3`}>
      <div className={`${specificTileClasses} sm:col-span-2 md:col-span-3`}>
        <div className="text-pastel-blue text-xl mb-2">Select Group</div>
        <div className="flex items-center justify-center flex-wrap">
          {withdrawalAddressesGroups.map((group) => (
            <button
              key={group.key}
              className={`${
                selectedGroup.name === group.name
                  ? 'bg-pastel-blue'
                  : 'bg-strong-pink hover:bg-dark-pink border-2'
              } inline-block text-white transition-colors px-4 py-2 rounded-xl m-1`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>
      <Validators validatorsCount={validatorsCount} />
      <Balance
        tokenPrice={tokenPrice}
        validatorsBalances={validatorsBalances}
      />
      <WithdrawableAmount
        tokenPrice={tokenPrice}
        validatorsCount={validatorsCount}
        validatorsBalances={validatorsBalances}
      />
      <TotalWithdrawals
        selectedGroup={selectedGroup}
        activeValidators={activeValidators}
        tokenPrice={tokenPrice}
      />
      <WithdrawalBalance
        tokenPrice={tokenPrice}
        selectedGroup={selectedGroup}
        withdrawalAddressesBalance={withdrawalAddressesBalance}
      />
      <Earnings
        timeframe="daily"
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="weekly"
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="monthly"
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="annual"
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Earnings
        timeframe="total"
        tokenPrice={tokenPrice}
        stakedLYX={stakedLYX}
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
        validatorsPerformance={validatorsPerformance}
      />
      <Attestations
        selectedGroup={selectedGroup}
        validatorsPerformance={validatorsPerformance}
      />
      <Luck selectedGroup={selectedGroup} validatorsLuck={validatorsLuck} />
      {/* <TimeframePercentageRate
        timeframe="daily"
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
      />
      <TimeframePercentageRate
        timeframe="weekly"
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
      />
      <TimeframePercentageRate
        timeframe="monthly"
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
      />
      <TimeframePercentageRate
        timeframe="annual"
        stakedLYX={stakedLYX}
        activeBalance={activeBalance}
      /> */}
    </div>
  );
};

export default ValidatorStats;
