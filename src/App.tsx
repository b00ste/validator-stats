import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import Body from './Components/Body';
import Header from './Components/Header';
import Footer from './Components/Footer';

// Handlers
import updateValidator from './Handlers/updateValidator';
import updateWithdrawalAddressesBalances from './Handlers/updateWithdrawalAddressesBalances';
import updateValidatorsMaps from './Handlers/updateValidatorsMaps';
import updateVaildatorsLuck from './Handlers/updateVaildatorsLuck';
import updateVaildatorsPerformance from './Handlers/updateVaildatorsPerformance';
import updateNetworkData from './Handlers/updateNetworkData';
import updateLYXPrice from './Handlers/updateLYXPrice';

// Helpers
import { generateUUID } from './Helpers/utils';

// Types
import {
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
  WithdrawalAddress,
  WithdrawalAddressesGroup,
} from './Types/UsedDataTypes';

function App() {
  /// ------ Default page to redirect from `/` ------
  const storedDefaultPage = localStorage.getItem('defaultPage');
  const [defaultPage, setDefaultPage] = useState(
    storedDefaultPage
      ? storedDefaultPage
      : ('/home' as
          | '/home'
          | '/validatorStatistics'
          | '/validatorList'
          | '/user'
          | ''),
  );
  /// -----------------------------------------------

  /// ------ Withdrawal Addresses ------
  const storedWithdrawalAddresses = localStorage.getItem('withdrawalAddresses');
  const [withdrawalAddresses, setWithdrawalAddresses] = useState(
    (storedWithdrawalAddresses
      ? JSON.parse(storedWithdrawalAddresses)
      : []) as WithdrawalAddress[],
  );

  const [withdrawalAddressesBalances, setWithdrawalAddressessBalances] =
    useState(undefined as Record<string, number> | undefined);
  /// -------------------------------------------

  /// ------ Withdrawal Addresses Groups ------
  const storedWithdrawalAddressessGroups = localStorage.getItem(
    'withdrawalAddressesGroups',
  );
  const [withdrawalAddressesGroups, setWithdrawalAddressessGroups] = useState(
    (storedWithdrawalAddressessGroups
      ? JSON.parse(storedWithdrawalAddressessGroups)
      : [
          { name: 'Main', key: generateUUID(), withdrawalAddresses },
        ]) as WithdrawalAddressesGroup[],
  );
  /// If the stored Main Group is different that the generated one, update it
  useEffect(() => {
    if (
      withdrawalAddresses &&
      withdrawalAddressesGroups.filter((group) => group.name === 'Main')[0]
        .withdrawalAddresses !== withdrawalAddresses
    ) {
      withdrawalAddressesGroups.map((group) =>
        group.name === 'Main'
          ? { name: group.name, key: group.key, withdrawalAddresses }
          : group,
      );
    }
  });
  /// -----------------------------------------

  /// ------ Validators withdrawalAddresses ------
  const storedValidators = localStorage.getItem('validators');
  const [validators, setValidators] = useState(
    (storedValidators ? JSON.parse(storedValidators) : {}) as Record<
      string,
      string[]
    >,
  );
  /// --------------------------------

  /// ------ Validator Data ------
  const [activeValidators, setActiveValidators] = useState(
    undefined as Record<string, ValidatorMap> | undefined,
  );
  const [pendingValidators, setPendingValidators] = useState(
    undefined as Record<string, ValidatorMap> | undefined,
  );
  const [offlineValidators, setOfflineValidators] = useState(
    undefined as Record<string, ValidatorMap> | undefined,
  );
  const [slashedValidators, setSlashedValidators] = useState(
    undefined as Record<string, ValidatorMap> | undefined,
  );
  const [otherValidators, setOtherValidators] = useState(
    undefined as Record<string, ValidatorMap> | undefined,
  );
  const [validatorsLuck, setValidatorsLuck] = useState(
    undefined as Record<string, ValidatorsLuck> | undefined,
  );
  const [validatorsPerformance, setValidatorsPerformance] = useState(
    undefined as Record<string, ValidatorsPerformance> | undefined,
  );
  /// ----------------------------

  /// ------ Network Data ------
  const [stakedLYX, setStakedLYX] = useState(undefined as number | undefined);
  const [currentEpoch, setCurrentEpoch] = useState(
    undefined as number | undefined,
  );
  const [networkValidators, setNetworkValidators] = useState(
    undefined as number | undefined,
  );
  /// --------------------------

  /// ------ Price Data ------
  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);
  /// --------------------------

  /// ------ Header Menu Toggle ------
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  /// --------------------------------

  /// ------ Update storage items ------
  useEffect(() => {
    localStorage.setItem(
      'withdrawalAddresses',
      JSON.stringify(withdrawalAddresses),
    );
  }, [withdrawalAddresses]);

  useEffect(() => {
    if (withdrawalAddressesGroups[0].name === 'Main') {
      withdrawalAddressesGroups[0].withdrawalAddresses = withdrawalAddresses;
    }
  }, [withdrawalAddressesGroups, withdrawalAddresses]);

  useEffect(() => {
    localStorage.setItem('validators', JSON.stringify(validators));
  }, [validators]);

  useEffect(() => {
    localStorage.setItem(
      'withdrawalAddressesGroups',
      JSON.stringify(withdrawalAddressesGroups),
    );
  }, [withdrawalAddressesGroups]);
  /// ----------------------------------

  /// Update validators and withdrawal addresses balance if `withdrawalAddresses` changes
  useEffect(() => {
    if (withdrawalAddresses.length > 0) {
      updateValidator(withdrawalAddresses, setValidators);
      updateWithdrawalAddressesBalances(
        withdrawalAddresses,
        setWithdrawalAddressessBalances,
      );
    }
  }, [withdrawalAddresses]);

  /// Update validators data (active/pending/slashed/other) if `validatorArray` changes
  useEffect(() => {
    if (Object.getOwnPropertyNames(validators).length > 0) {
      updateValidatorsMaps(
        validators,
        setActiveValidators,
        setPendingValidators,
        setOfflineValidators,
        setSlashedValidators,
        setOtherValidators,
      );
    }
  }, [validators]);

  /// Update validators luck & performance if `activeValidators` changes
  useEffect(() => {
    if (
      !validatorsLuck &&
      !validatorsPerformance &&
      activeValidators &&
      Object.getOwnPropertyNames(activeValidators).length > 0
    ) {
      updateVaildatorsLuck(activeValidators, setValidatorsLuck);
      updateVaildatorsPerformance(activeValidators, setValidatorsPerformance);
    }
  }, [validatorsLuck, validatorsPerformance, activeValidators]);

  /// Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    if (!stakedLYX || !currentEpoch || !networkValidators) {
      updateNetworkData(setStakedLYX, setCurrentEpoch, setNetworkValidators);
    }
  }, [stakedLYX, currentEpoch, networkValidators]);

  /// Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (!eurPrice && !usdPrice) {
      updateLYXPrice(setEurPrce, setUsdPrce);
    }
  }, [eurPrice, usdPrice]);

  /// ------ Refresh Data ------
  const refreshHandler = useCallback(() => {
    updateValidator(withdrawalAddresses, setValidators);
    updateWithdrawalAddressesBalances(
      withdrawalAddresses,
      setWithdrawalAddressessBalances,
    );

    if (activeValidators) {
      updateValidatorsMaps(
        validators,
        setActiveValidators,
        setPendingValidators,
        setOfflineValidators,
        setSlashedValidators,
        setOtherValidators,
      );
      updateVaildatorsLuck(activeValidators, setValidatorsLuck);
      updateVaildatorsPerformance(activeValidators, setValidatorsPerformance);
    }

    updateNetworkData(setStakedLYX, setCurrentEpoch, setNetworkValidators);
    updateLYXPrice(setEurPrce, setUsdPrce);
  }, [withdrawalAddresses, validators, activeValidators]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshHandler();
    }, 10000);

    return () => clearInterval(interval);
  });
  /// --------------------------

  /// ------ Navigating handler ------
  const handlePageNavigation = (navigate: Function, page: string) => {
    navigate(page);
    toggleDropdown();
  };
  /// --------------------------------

  /// ------ Compartimetised Data ------
  const validatorsMaps = {
    activeValidators: activeValidators ? activeValidators : {},
    pendingValidators: pendingValidators ? pendingValidators : {},
    offlineValidators: offlineValidators ? offlineValidators : {},
    slashedValidators: slashedValidators ? slashedValidators : {},
    otherValidators: otherValidators ? otherValidators : {},
  };

  const validatorsData = {
    validatorsMaps,
    validatorsLuck: validatorsLuck ? validatorsLuck : {},
    validatorsPerformance: validatorsPerformance ? validatorsPerformance : {},
  };

  const tokenPrice = {
    eurPrice: eurPrice ? eurPrice : '',
    usdPrice: usdPrice ? usdPrice : '',
  };

  const networkData = {
    stakedLYX: stakedLYX ? stakedLYX : 0,
    currentEpoch: currentEpoch ? currentEpoch : 0,
    networkValidators: networkValidators ? networkValidators : 0,
  };
  /// ----------------------------------

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-center items-center bg-pink pb-12 transition-all ${
        isDropdownOpen ? 'pt-72' : 'pt-44 delay-75 duration-200'
      }`}
    >
      <Router>
        <Header
          networkData={networkData}
          tokenPrice={tokenPrice}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          refreshHandler={refreshHandler}
          handlePageNavigation={handlePageNavigation}
        />
        <Body
          defaultPage={defaultPage}
          setDefaultPage={setDefaultPage}
          handlePageNavigation={handlePageNavigation}
          withdrawalAddresses={withdrawalAddresses}
          setWithdrawalAddresses={setWithdrawalAddresses}
          withdrawalAddressesGroups={withdrawalAddressesGroups}
          setWithdrawalAddressessGroups={setWithdrawalAddressessGroups}
          withdrawalAddressesBalances={withdrawalAddressesBalances}
          validators={validators}
          setValidators={setValidators}
          validatorsData={validatorsData}
          networkData={networkData}
          tokenPrice={tokenPrice}
        />
        <Footer handlePageNavigation={handlePageNavigation} />
      </Router>
    </div>
  );
}

export default App;
