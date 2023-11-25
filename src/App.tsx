import { createContext, useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

// Components
import Header from './Components/Header';
import Footer from './Components/Footer';

// Pages
import Landing from './Pages/Landing';
import ValidatorStats from './Pages/ValidatorStats';
import Validators from './Pages/Validators';
import User from './Pages/User';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import License from './Pages/License';
import PageNotFound from './Pages/PageNotFound';

// Handlers
import updateValidator from './Handlers/updateValidator';
import updateWithdrawalAddressesBalances from './Handlers/updateWithdrawalAddressesBalances';
import updateValidatorsMaps from './Handlers/updateValidatorsData';
import updateNetworkData from './Handlers/updateNetworkData';
import updateLYXPrice from './Handlers/updateLYXPrice';

// Helpers
import { generateUUID } from './Helpers/utils';

// Types
import {
  LYXPrice,
  NetworkData,
  ValidatorsData,
  WithdrawalAddress,
  WithdrawalAddressesGroup,
} from './Types/UsedDataTypes';
import updateValidatorsData from './Handlers/updateValidatorsData';

// context
export const LYXPriceContext = createContext<LYXPrice>({});
export const NetworkContext = createContext<NetworkData>({});
export const ValidatorsDataContext = createContext<ValidatorsData>({});

function App() {
  /// ------ Default page to redirect from `/` ------
  const storedDefaultPage = localStorage.getItem('defaultPage') as
    | '/home'
    | '/validatorStatistics'
    | '/validatorList'
    | '/user';
  const [defaultPage, setDefaultPage] = useState<
    '/home' | '/validatorStatistics' | '/validatorList' | '/user'
  >(storedDefaultPage ? storedDefaultPage : '/home');
  /// -----------------------------------------------

  /// ------ Withdrawal Addresses ------
  const storedWithdrawalAddresses = localStorage.getItem('withdrawalAddresses');
  const [withdrawalAddresses, setWithdrawalAddresses] = useState<
    WithdrawalAddress[]
  >(storedWithdrawalAddresses ? JSON.parse(storedWithdrawalAddresses) : []);

  const [withdrawalAddressesBalances, setWithdrawalAddressessBalances] =
    useState<Record<string, number>>();
  /// -------------------------------------------

  /// ------ Withdrawal Addresses Groups ------
  const storedWithdrawalAddressessGroups = localStorage.getItem(
    'withdrawalAddressesGroups',
  );
  const [withdrawalAddressesGroups, setWithdrawalAddressessGroups] = useState<
    WithdrawalAddressesGroup[]
  >(
    storedWithdrawalAddressessGroups
      ? JSON.parse(storedWithdrawalAddressessGroups)
      : [{ name: 'Main', key: generateUUID(), withdrawalAddresses }],
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
  const [validatorsData, setValidatorsData] = useState<ValidatorsData>({});
  /// ----------------------------

  /// ------ Network Data ------
  const [networkData, setNetworkData] = useState<NetworkData>({});
  /// --------------------------

  /// ------ Price Data ------
  const [LYXPrice, setLYXPrice] = useState<LYXPrice>({});
  /// --------------------------

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
      updateValidatorsData(validators, setValidatorsData);
    }
  }, [validators]);

  /// Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    const { stakedLYX, currentEpoch, networkValidators } = networkData;

    if (!stakedLYX || !currentEpoch || !networkValidators) {
      updateNetworkData(setNetworkData);
    }
  }, [networkData]);

  /// Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (!LYXPrice) {
      updateLYXPrice(setLYXPrice);
    }
  }, [LYXPrice]);

  /// ------ Refresh Data ------
  const refreshHandler = useCallback(() => {
    updateValidator(withdrawalAddresses, setValidators);
    updateWithdrawalAddressesBalances(
      withdrawalAddresses,
      setWithdrawalAddressessBalances,
    );

    updateValidatorsMaps(validators, setValidatorsData);

    updateNetworkData(setNetworkData);
    updateLYXPrice(setLYXPrice);
  }, [withdrawalAddresses, validators]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshHandler();
    }, 10000);

    return () => clearInterval(interval);
  });
  /// --------------------------

  return (
    <div className="min-h-screen relative">
      <Router>
        <LYXPriceContext.Provider value={LYXPrice}>
          <NetworkContext.Provider value={networkData}>
            <Header refreshHandler={refreshHandler} />
            <ValidatorsDataContext.Provider value={validatorsData}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate
                      to={defaultPage ? defaultPage : '/home'}
                      replace
                    />
                  }
                />
                <Route path="/home" element={<Landing />} />
                <Route
                  path="/validatorStatistics"
                  element={
                    <ValidatorStats
                      withdrawalAddressesGroups={withdrawalAddressesGroups}
                      withdrawalAddressesBalance={
                        withdrawalAddressesBalances
                          ? withdrawalAddressesBalances
                          : {}
                      }
                    />
                  }
                />
                <Route
                  path="/user"
                  element={
                    <User
                      defaultPage={defaultPage}
                      setDefaultPage={setDefaultPage}
                      withdrawalAddresses={withdrawalAddresses}
                      setWithdrawalAddresses={setWithdrawalAddresses}
                      validators={validators}
                      setValidators={setValidators}
                      withdrawalAddressesGroups={withdrawalAddressesGroups}
                      setWithdrawalAddressessGroups={
                        setWithdrawalAddressessGroups
                      }
                    />
                  }
                />
                <Route
                  path="/validatorList"
                  element={
                    <Validators withdrawalAddresses={withdrawalAddresses} />
                  }
                />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/license" element={<License />} />
                <Route path="/*" element={<PageNotFound />} />
              </Routes>
            </ValidatorsDataContext.Provider>
            <Footer />
          </NetworkContext.Provider>
        </LYXPriceContext.Provider>
      </Router>
    </div>
  );
}

export default App;
