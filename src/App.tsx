import { useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// components
import Header from './Components/Header';
import Footer from './Components/Footer';
import Landing from './Components/Pages/Landing';
import ValidatorStats from './Components/Pages/ValidatorStats';
import User from './Components/Pages/User';
import Validators from './Components/Pages/Validators';
import TermsAndConditions from './Components/Pages/TermsAndConditions';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import License from './Components/Pages/License';

// helpers
import {
  fetchValidators,
  fetchValidatorsData,
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
} from './Helpers/validators';
import {
  getLYXPrice,
  getLastEpoch,
  getWithdrawalAddressesBalance,
} from './Helpers/network';

// ts types
import {
  WithdrawalAddresses,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
  WithdrawalAddressesGroup,
} from './Types/UsedDataTypes';
import PageNotFound from './Components/Pages/PageNotFound';
import { generateUUID } from './Helpers/utils';

function App() {
  /// Default page to redirect from `/`
  const storedDefaultPage = localStorage.getItem('defaultPage');
  const [defaultPage, setDefaultPage] = useState(
    storedDefaultPage
      ? storedDefaultPage
      : ('/home' as
          | '/home'
          | '/validatorStatistics'
          | '/validatorList'
          | 'user'
          | ''),
  );

  /// ------ Withdrawal Addresses ------
  const storedWithdrawalAddresses = localStorage.getItem('withdrawalAddresses');
  const [withdrawalAddresses, setWithdrawalAddresses] = useState(
    (storedWithdrawalAddresses
      ? JSON.parse(storedWithdrawalAddresses)
      : []) as WithdrawalAddresses[],
  );
  const [withdrawalAddressesBalance, setWithdrawalAddressessBalance] = useState(
    undefined as Record<string, number> | undefined,
  );
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

  /// ------ Handlers for Data Update ------
  const updateValidatorHandler = useCallback(() => {
    const validators = fetchValidators(withdrawalAddresses);

    validators.then((data) => setValidators(data));
  }, [withdrawalAddresses]);

  const updateWithdrawalAddressesBalanceHandler = useCallback(() => {
    const newWithdrawalAddressesBalance =
      getWithdrawalAddressesBalance(withdrawalAddresses);

    newWithdrawalAddressesBalance.then((data) =>
      setWithdrawalAddressessBalance(data),
    );
  }, [withdrawalAddresses]);

  const updateValidatorsMaps = useCallback(() => {
    const fetchedData = fetchValidatorsData(validators);

    fetchedData.then((data) => {
      setActiveValidators(data.activeValidators);
      setPendingValidators(data.pendingValidators);
      setOfflineValidators(data.offlineValidators);
      setSlashedValidators(data.slashedValidators);
      setOtherValidators(data.otherValidators);
    });
  }, [validators]);

  const updateVaildatorsLuck = useCallback(() => {
    if (activeValidators) {
      let newValidatorsLuck = fetchValidatorsLuck(activeValidators);

      newValidatorsLuck.then((data) => setValidatorsLuck(data));
    }
  }, [activeValidators]);

  const updateVaildatorsPerformance = useCallback(() => {
    if (activeValidators) {
      let newValidatorsPerformance =
        fetchValidatorsPerformance(activeValidators);

      newValidatorsPerformance.then((data) => setValidatorsPerformance(data));
    }
  }, [activeValidators]);

  const updateNetworkData = useCallback(() => {
    const fetchedData = getLastEpoch();

    fetchedData.then((epochData) => {
      setStakedLYX(epochData.totalvalidatorbalance);
      setCurrentEpoch(epochData.epoch);
      setNetworkValidators(epochData.validatorscount);
    });
  }, []);

  const updateLYXPrice = useCallback(() => {
    const fetchedPrices = getLYXPrice();

    fetchedPrices.then((data) => {
      setEurPrce(data.eurPrice);
      setUsdPrce(data.usdPrice);
    });
  }, []);

  const refreshHandler = useCallback(() => {
    updateValidatorHandler();
    updateWithdrawalAddressesBalanceHandler();
    updateValidatorsMaps();
    updateVaildatorsLuck();
    updateVaildatorsPerformance();
    updateNetworkData();
    updateLYXPrice();
  }, [
    updateValidatorHandler,
    updateWithdrawalAddressesBalanceHandler,
    updateValidatorsMaps,
    updateVaildatorsLuck,
    updateVaildatorsPerformance,
    updateNetworkData,
    updateLYXPrice,
  ]);
  /// --------------------------------------

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
      updateValidatorHandler();
      updateWithdrawalAddressesBalanceHandler();
    }
  }, [
    withdrawalAddresses,
    updateValidatorHandler,
    updateWithdrawalAddressesBalanceHandler,
  ]);

  /// Update validators data (active/pending/slashed/other) if `validatorArray` changes
  useEffect(() => {
    if (Object.getOwnPropertyNames(validators).length > 0) {
      updateValidatorsMaps();
    }
  }, [validators, updateValidatorsMaps]);

  /// Update validators luck & performance if `activeValidators` changes
  useEffect(() => {
    if (
      !validatorsLuck &&
      !validatorsPerformance &&
      activeValidators &&
      Object.getOwnPropertyNames(activeValidators).length > 0
    ) {
      updateVaildatorsLuck();
      updateVaildatorsPerformance();
    }
  }, [
    validatorsLuck,
    validatorsPerformance,
    activeValidators,
    updateVaildatorsLuck,
    updateVaildatorsPerformance,
  ]);

  /// Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    if (!stakedLYX || !currentEpoch || !networkValidators) {
      updateNetworkData();
    }
  }, [stakedLYX, currentEpoch, networkValidators, updateNetworkData]);

  /// Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (!eurPrice && !usdPrice) {
      updateLYXPrice();
    }
  }, [eurPrice, usdPrice, updateLYXPrice]);

  /// ------ Refresh Data ------
  useEffect(() => {
    const interval = setInterval(() => {
      refreshHandler();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshHandler]);
  /// --------------------------

  /// ------ Navigating handler ------
  const handlePageNavigation = (navigate: Function, page: string) => {
    navigate(page);
    toggleDropdown();
  };
  /// --------------------------------

  /// ------ Styling ------
  const bodyClasses =
    'container mx-auto gap-4 p-4 transition-all duration-75 grid grid-cols-1';

  const tileClasses =
    'relative bg-misty-rose border border-emerald rounded-lg shadow-lg';

  const buttonClasses =
    'bg-strong-pink hover:bg-dark-pink border-2 border-dark-pink text-white transition-colors px-4 py-2 rounded-lg ';

  /// ---------------------

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
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to={defaultPage ? defaultPage : '/home'} replace />
            }
          />
          <Route
            path="/home"
            element={
              <Landing
                bodyClasses={bodyClasses}
                tileClasses={tileClasses}
                buttonClasses={buttonClasses}
                handlePageNavigation={handlePageNavigation}
              />
            }
          />
          <Route
            path="/validatorStatistics"
            element={
              <ValidatorStats
                bodyClasses={bodyClasses}
                tileClasses={tileClasses}
                buttonClasses={buttonClasses}
                stakedLYX={stakedLYX ? stakedLYX : 0}
                tokenPrice={tokenPrice}
                validatorsData={validatorsData}
                withdrawalAddressesGroups={withdrawalAddressesGroups}
                withdrawalAddressesBalance={
                  withdrawalAddressesBalance ? withdrawalAddressesBalance : {}
                }
              />
            }
          />
          <Route
            path="/user"
            element={
              <User
                bodyClasses={bodyClasses}
                tileClasses={tileClasses}
                buttonClasses={buttonClasses}
                withdrawalAddresses={withdrawalAddresses}
                setWithdrawalAddresses={setWithdrawalAddresses}
                validators={validators}
                setValidators={setValidators}
                defaultPage={defaultPage}
                setDefaultPage={setDefaultPage}
                withdrawalAddressesGroups={withdrawalAddressesGroups}
                setWithdrawalAddressessGroups={setWithdrawalAddressessGroups}
              />
            }
          />
          <Route
            path="/validatorList"
            element={
              <Validators
                bodyClasses={bodyClasses}
                tileClasses={tileClasses}
                withdrawalAddresses={withdrawalAddresses}
                validators={validators}
                validatorsMaps={validatorsMaps}
                validatorsPerformance={
                  validatorsPerformance ? validatorsPerformance : {}
                }
              />
            }
          />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/license" element={<License />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Header
          buttonClasses={buttonClasses}
          networkData={networkData}
          tokenPrice={tokenPrice}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          refreshHandler={refreshHandler}
          handlePageNavigation={handlePageNavigation}
        />
        <Footer handlePageNavigation={handlePageNavigation} />
      </Router>
    </div>
  );
}

export default App;
