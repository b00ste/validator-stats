import { useContext, useEffect, useState } from 'react';

// Stats Tiles
import { Earnings } from '../Components/ValidatorStatsComponents/Earnings';
import { Attestations } from '../Components/ValidatorStatsComponents/Attestations';
import { Luck } from '../Components/ValidatorStatsComponents/Luck';
import { Validators } from '../Components/ValidatorStatsComponents/Validators';
import { Balance } from '../Components/ValidatorStatsComponents/Balance';
import { TotalWithdrawals } from '../Components/ValidatorStatsComponents/TotalWithdrawals';
import { WithdrawalBalance } from '../Components/ValidatorStatsComponents/WithdrawalBalance';
import { WithdrawableAmount } from '../Components/ValidatorStatsComponents/WithdrawableAmount';

// types
import { ValidatorMap, WithdrawalAddressesGroup } from '../Types/UsedDataTypes';

// context
import { ValidatorsDataContext } from '../App';
import Network from '../Components/ValidatorStatsComponents/Network';
import SelectGroup from '../Components/ValidatorStatsComponents/SelectGroup';

interface Props {
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  withdrawalAddressesBalance: Record<string, number>;
}

const ValidatorStats: React.FC<Props> = ({
  withdrawalAddressesGroups,
  withdrawalAddressesBalance,
}) => {
  const {
    activeValidators = {},
    pendingValidators = {},
    offlineValidators = {},
    slashedValidators = {},
    otherValidators = {},
  } = useContext(ValidatorsDataContext);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      <SelectGroup
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
        withdrawalAddressesGroups={withdrawalAddressesGroups}
      />
      <Network />
      <Validators validatorsCount={validatorsCount} />
      <Balance validatorsBalances={validatorsBalances} />
      <WithdrawableAmount
        validatorsCount={validatorsCount}
        validatorsBalances={validatorsBalances}
      />
      <WithdrawalBalance
        selectedGroup={selectedGroup}
        withdrawalAddressesBalance={withdrawalAddressesBalance}
      />
      <TotalWithdrawals selectedGroup={selectedGroup} />
      <Earnings
        timeframe="daily"
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
      />
      <Earnings
        timeframe="weekly"
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
      />
      <Earnings
        timeframe="monthly"
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
      />
      <Earnings
        timeframe="annual"
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
      />
      <Earnings
        timeframe="total"
        selectedGroup={selectedGroup}
        activeBalance={activeBalance}
      />
      <Attestations selectedGroup={selectedGroup} />
      <Luck selectedGroup={selectedGroup} />
    </div>
  );
};

export default ValidatorStats;
