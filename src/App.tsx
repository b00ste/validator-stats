import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/Pages/LandingPage";
import { ValidatorStatsPage } from "./components/Pages/ValidatorStatsPage";
import { UserPage } from "./components/Pages/UserPage";
import { ValidatorsPage } from "./components/Pages/ValidatosPage";
import { TermsAndConditions } from "./components/Pages/TermsAndConditions";
import { PrivacyPolicy } from "./components/Pages/PrivacyPolicy";
import { License } from "./components/Pages/License";

// helpers
import {
  fetchValidators,
  fetchValidatorsData,
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
} from "./helpers/validators";
import {
  getLYXPrice,
  getLastEpoch,
  getWithdrawalAddressesBalance,
} from "./helpers/network";

// ts types
import {
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
} from "./typings/UsedDataTypes";

function App() {
  /// ------ Deposior/Withdrawal Addresses ------
  const storedPublicKeys = localStorage.getItem("publicKeys");
  const [publicKeys, setPublicKeys] = useState(
    (storedPublicKeys ? JSON.parse(storedPublicKeys) : []) as PublicKey[]
  );
  const [withdrawalAddressesBalance, setWithdrawalAddressesBalance] = useState(
    undefined as number | undefined
  );
  /// -------------------------------------------

  /// ------ Validators Pubkeys ------
  const storedValidatorArray = localStorage.getItem("validatorArray");
  const [validatorArray, setValidatorArray] = useState(
    (storedValidatorArray ? JSON.parse(storedValidatorArray) : []) as string[]
  );
  /// --------------------------------

  /// ------ Validator Data ------
  const [activeValidators, setActiveValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [pendingValidators, setPendingValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [offlineValidators, setOfflineValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [slashedValidators, setSlashedValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [otherValidators, setOtherValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [validatorsLuck, setValidatorsLuck] = useState(
    undefined as ValidatorsLuck | undefined
  );
  const [validatorsPerformance, setValidatorsPerformance] = useState(
    undefined as ValidatorsPerformance | undefined
  );
  /// ----------------------------

  /// ------ Network Data ------
  const [stakedLYX, setStakedLYX] = useState(undefined as number | undefined);
  const [currentEpoch, setCurrentEpoch] = useState(
    undefined as number | undefined
  );
  const [networkValidators, setNetworkValidators] = useState(
    undefined as number | undefined
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
    const validators = fetchValidators(publicKeys);

    validators.then((data) => setValidatorArray(data));
  }, [publicKeys]);

  const updateWithdrawalAddressesBalanceHandler = useCallback(() => {
    const newWithdrawalAddressesBalance =
      getWithdrawalAddressesBalance(publicKeys);

    newWithdrawalAddressesBalance.then((data) =>
      setWithdrawalAddressesBalance(data)
    );
  }, [publicKeys]);

  const updateValidatorsMaps = useCallback(() => {
    const fetchedData = fetchValidatorsData(validatorArray);

    fetchedData.then((data) => {
      setActiveValidators(data.activeValidators);
      setPendingValidators(data.pendingValidators);
      setOfflineValidators(data.offlineValidators);
      setSlashedValidators(data.slashedValidators);
      setOtherValidators(data.otherValidators);
    });
  }, [validatorArray]);

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

  /// Save validators to local storage
  useEffect(() => {
    localStorage.setItem("validatorArray", JSON.stringify(validatorArray));
  }, [validatorArray]);

  /// Update validators and withdrawal addresses balance if `publicKeys` changes
  useEffect(() => {
    if (publicKeys.length > 0) {
      updateValidatorHandler();
      updateWithdrawalAddressesBalanceHandler();
    }
  }, [
    publicKeys,
    updateValidatorHandler,
    updateWithdrawalAddressesBalanceHandler,
  ]);

  /// Update validators data (active/pending/slashed/other) if `validatorArray` changes
  useEffect(() => {
    if (validatorArray.length > 0) {
      updateValidatorsMaps();
    }
  }, [validatorArray, updateValidatorsMaps]);

  /// Update validators luck & performance if `activeValidators` changes
  useEffect(() => {
    if (
      activeValidators &&
      Object.getOwnPropertyNames(activeValidators).length > 0
    ) {
      updateVaildatorsLuck();
      updateVaildatorsPerformance();
    }
  }, [activeValidators, updateVaildatorsLuck, updateVaildatorsPerformance]);

  /// Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    if (!stakedLYX && !currentEpoch && !networkValidators) {
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
    }, 60000);

    return () => clearInterval(interval);
  }, [refreshHandler]);
  /// --------------------------

  /// ------ Page Change Handler ------
  const [mountStatsPage, setMountStatsPage] = useState(
    window.location.pathname === "/statistics"
  );
  const [mountUserPage, setMountUserPage] = useState(
    window.location.pathname === "/user"
  );
  const [mountValidatorsPage, setMountValidatorsPage] = useState(
    window.location.pathname === "/validators"
  );
  const [mountTermsPage, setMountTermsPage] = useState(
    window.location.pathname === "/terms"
  );
  const [mountPrivacyPage, setMountPrivacyPage] = useState(
    window.location.pathname === "/privacy"
  );
  const [mountLicensePage, setMountLicensePage] = useState(
    window.location.pathname === "/license"
  );
  const pageChangeHandler = (navigate: Function, navigateParam: string) => {
    // Update the page mount status
    setMountStatsPage(navigateParam === "/statistics");
    setMountUserPage(navigateParam === "/user");
    setMountValidatorsPage(navigateParam === "/validators");
    setMountTermsPage(navigateParam === "/terms");
    setMountPrivacyPage(navigateParam === "/privacy");
    setMountLicensePage(navigateParam === "/license");

    // Navigate to the new page after the animation ends
    setTimeout(() => {
      navigate(navigateParam);
    }, 75);

    // Close drop down menu
    setDropdownOpen(false);
  };
  /// ---------------------------------

  /// ------ Styling ------
  const bodyClasses =
    "container mx-auto gap-4 p-4 transition-all duration-75 grid grid-cols-1";
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
    validatorsLuck: validatorsLuck
      ? validatorsLuck
      : {
          average_proposal_interval: 0,
          next_proposal_estimate_ts: 0,
          proposal_luck: 0,
          time_frame_name: "",
        },
    validatorsPerformance: validatorsPerformance ? validatorsPerformance : {},
  };

  const tokenPrice = {
    eurPrice: eurPrice ? eurPrice : "",
    usdPrice: usdPrice ? usdPrice : "",
  };

  const networkData = {
    stakedLYX: stakedLYX ? stakedLYX : 0,
    currentEpoch: currentEpoch ? currentEpoch : 0,
    networkValidators: networkValidators ? networkValidators : 0,
  };
  /// ----------------------------------

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-center items-center bg-soft-pink pb-12 transition-all ${
        isDropdownOpen ? "pt-64 sm:pt-52" : "pt-44 delay-75 duration-200"
      }`}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage pageChangeHandler={pageChangeHandler} />}
          />
          <Route
            path="/statistics"
            element={
              <ValidatorStatsPage
                mountStatsPage={mountStatsPage}
                bodyClasses={bodyClasses}
                stakedLYX={stakedLYX ? stakedLYX : 0}
                tokenPrice={tokenPrice}
                validatorsData={validatorsData}
                withdrawalAddressesBalance={
                  withdrawalAddressesBalance ? withdrawalAddressesBalance : 0
                }
              />
            }
          />
          <Route
            path="/user"
            element={
              <UserPage
                mountUserPage={mountUserPage}
                bodyClasses={bodyClasses}
                publicKeys={publicKeys}
                setPublicKeys={setPublicKeys}
                setValidatorArray={setValidatorArray}
              />
            }
          />
          <Route
            path="/validators"
            element={
              <ValidatorsPage
                mountValidatorsPage={mountValidatorsPage}
                bodyClasses={bodyClasses}
                publicKeys={publicKeys}
                validatorArray={validatorArray}
                validatorsMaps={validatorsMaps}
                validatorsPerformance={
                  validatorsPerformance ? validatorsPerformance : {}
                }
              />
            }
          />
          <Route
            path="/terms"
            element={<TermsAndConditions mountTermsPage={mountTermsPage} />}
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicy mountPrivacyPage={mountPrivacyPage} />}
          />
          <Route
            path="/license"
            element={<License mountLicensePage={mountLicensePage} />}
          />
        </Routes>
        <Header
          networkData={networkData}
          tokenPrice={tokenPrice}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          pageChangeHandler={pageChangeHandler}
          refreshHandler={refreshHandler}
        />
        <Footer pageChangeHandler={pageChangeHandler} />
      </Router>
    </div>
  );
}

export default App;
