import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import { StatsPage } from "./components/StatsPage";
import { UserPage } from "./components/UserPage";
import { ValidatorsPage } from "./components/ValidatosPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TermsAndConditions } from "./components/TermsAndConditions";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { License } from "./components/License";

// helpers
import {
  fetchValidators,
  fetchValidatorsData,
  fetchValidatorsLuck,
  fetchValidatorsPerformance,
} from "./helpers/validators";
import { getLastEpoch, getWithdrawalAddressBalance } from "./helpers/network";

// ts types
import {
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
} from "./typings/types";

function App() {
  // ------ Deposior/Withdrawal Addresses ------
  const storedPublicKeys = localStorage.getItem("publicKeys");
  const [publicKeys, setPublicKeys] = useState(
    (storedPublicKeys ? JSON.parse(storedPublicKeys) : []) as PublicKey[]
  );
  const [withdrawalAddressesBalance, setWithdrawalAddressesBalance] =
    useState(0);
  // -------------------------------------------

  // ------ Validators Pubkeys ------
  const storedValidatorArray = localStorage.getItem("validatorArray");
  const [validatorArray, setValidatorArray] = useState(
    (storedValidatorArray ? JSON.parse(storedValidatorArray) : []) as string[]
  );
  const [validatorArrayNeedsUpdate, setValidatorArrayNeedsUpdate] =
    useState(false);
  // --------------------------------

  // ------ Validator Data ------
  const [activeValidators, setActiveValidators] = useState({} as ValidatorMap);
  const [pendingValidators, setPendingValidators] = useState(
    {} as ValidatorMap
  );
  const [slashedValidators, setSlashedValidators] = useState(
    {} as ValidatorMap
  );
  const [otherValidators, setOtherValidators] = useState({} as ValidatorMap);
  const [validatorsLuck, setValidatorsLuck] = useState({} as ValidatorsLuck);
  const [validatorsPerformance, setValidatorsPerformance] = useState(
    {} as ValidatorsPerformance
  );
  // ----------------------------

  // ------ Network Data ------
  const [stakedLYX, setStakedLYX] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [networkValidators, setNetworkValidators] = useState(0);
  // --------------------------

  // ------ Price Data ------
  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);
  // --------------------------

  // ------ Update booleans ------
  const [validatorMapsNeedUpdate, setValidatorMapsNeedUpdate] = useState(true);
  const [networkDataNeedsUpdate, setNetworkDataNeedsUpdate] = useState(true);
  const [luckNeedsUpdate, setLuckNeedsUpdate] = useState(true);
  const [performanceNeedsUpdate, setPerformanceNeedsUpdate] = useState(true);
  const [LYXPriceNeedsUpdate, setLYXPriceNeedsUpdate] = useState(true);
  const [
    withdrawalAddressesBalanceNeedsUpdate,
    setWithdrawalAddressesBalanceNeedsUpdate,
  ] = useState(true);
  // -----------------------------

  // Save validators to local storage
  useEffect(() => {
    localStorage.setItem("validatorArray", JSON.stringify(validatorArray));
  }, [validatorArray]);

  // Fetch total balance of the withdrawal addrsses
  useEffect(() => {
    if (withdrawalAddressesBalanceNeedsUpdate) {
      const fetchedData = getWithdrawalAddressBalance(publicKeys);

      fetchedData.then((data) => setWithdrawalAddressesBalance(data));
      setWithdrawalAddressesBalanceNeedsUpdate(false);
    }
  }, [publicKeys, withdrawalAddressesBalanceNeedsUpdate]);

  // Fetch validators and filter them based on withdrawal address
  useEffect(() => {
    if (validatorArray.length === 0) {
      const fetchedData = fetchValidators(publicKeys);

      fetchedData.then((data) => setValidatorArray(data));
      setValidatorArrayNeedsUpdate(false);
    }
  }, [publicKeys, validatorArray.length]);

  useEffect(() => {
    if (validatorArrayNeedsUpdate) {
      const fetchedData = fetchValidators(publicKeys);

      fetchedData.then((data) => setValidatorArray(data));
    }
  }, [publicKeys, validatorArrayNeedsUpdate]);

  // Update validators data (active/pending/slashed/other)
  useEffect(() => {
    if (validatorArray.length > 0 && validatorMapsNeedUpdate) {
      const fetchedData = fetchValidatorsData(validatorArray);

      fetchedData.then((data) => {
        setActiveValidators(data.activeValidators);
        setPendingValidators(data.pendingValidators);
        setSlashedValidators(data.slashedValidators);
        setOtherValidators(data.otherValidators);
      });

      setValidatorMapsNeedUpdate(false);
    }
  }, [validatorArray, validatorMapsNeedUpdate]);

  // Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    if (networkDataNeedsUpdate) {
      const fetchedData = getLastEpoch();

      fetchedData.then((epochData) => {
        setStakedLYX(epochData.totalvalidatorbalance);
        setCurrentEpoch(epochData.epoch);
        setNetworkValidators(epochData.validatorscount);
      });

      setNetworkDataNeedsUpdate(false);
    }
  }, [networkDataNeedsUpdate]);

  // Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (LYXPriceNeedsUpdate) {
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=lukso-token-2&vs_currencies=eur%2Cusd"
      )
        .then((res) => res.json())
        .then((data) => {
          setEurPrce(data["lukso-token-2"].eur);
          setUsdPrce(data["lukso-token-2"].usd);
        });

      setLYXPriceNeedsUpdate(false);
    }
  }, [LYXPriceNeedsUpdate]);

  // Update validators luck
  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      luckNeedsUpdate
    ) {
      let fetchedData = fetchValidatorsLuck(activeValidators);

      fetchedData.then((data) => setValidatorsLuck(data));
      setLuckNeedsUpdate(false);
    }
  }, [activeValidators, luckNeedsUpdate]);

  // Update validators performance
  useEffect(() => {
    if (
      Object.getOwnPropertyNames(activeValidators).length > 0 &&
      performanceNeedsUpdate
    ) {
      let fetchedData = fetchValidatorsPerformance(activeValidators);

      fetchedData.then((data) => setValidatorsPerformance(data));
      setPerformanceNeedsUpdate(false);
    }
  }, [activeValidators, performanceNeedsUpdate]);

  // Refresh data every minute
  useEffect(() => {
    if (
      !luckNeedsUpdate &&
      !performanceNeedsUpdate &&
      !LYXPriceNeedsUpdate &&
      !networkDataNeedsUpdate &&
      !validatorMapsNeedUpdate &&
      !withdrawalAddressesBalanceNeedsUpdate
    ) {
      const id = setInterval(() => {
        setLuckNeedsUpdate(true);
        setPerformanceNeedsUpdate(true);
        setLYXPriceNeedsUpdate(true);
        setNetworkDataNeedsUpdate(true);
        setValidatorMapsNeedUpdate(true);
        setWithdrawalAddressesBalanceNeedsUpdate(true);
      }, 60000);
      return () => clearInterval(id);
    }
  }, [
    luckNeedsUpdate,
    performanceNeedsUpdate,
    LYXPriceNeedsUpdate,
    withdrawalAddressesBalanceNeedsUpdate,
    validatorMapsNeedUpdate,
    networkDataNeedsUpdate,
  ]);

  const handleRefresh = () => {
    const fetchedData = fetchValidators(publicKeys);

    fetchedData.then((data) => setValidatorArray(data));

    setValidatorMapsNeedUpdate(true);
    setNetworkDataNeedsUpdate(true);
    setLuckNeedsUpdate(true);
    setPerformanceNeedsUpdate(true);
    setLYXPriceNeedsUpdate(true);
    setWithdrawalAddressesBalanceNeedsUpdate(true);
  };

  const bodyClasses =
    "min-h-screen relative flex flex-col justify-center items-center bg-soft-pink pt-36 pb-16";

  return (
    <div className={bodyClasses}>
      <Router>
        <Header
          stakedLYX={stakedLYX}
          currentEpoch={currentEpoch}
          networkValidators={networkValidators}
          handleRefresh={handleRefresh}
        />
        <Routes>
          <Route
            path="/"
            element={
              <StatsPage
                stakedLYX={stakedLYX}
                eurPrice={eurPrice ? eurPrice : ""}
                usdPrice={usdPrice ? usdPrice : ""}
                activeValidators={activeValidators}
                pendingValidators={pendingValidators}
                slashedValidators={slashedValidators}
                otherValidators={otherValidators}
                validatorsLuck={validatorsLuck}
                validatorsPerformance={validatorsPerformance}
                withdrawalAddressesBalance={withdrawalAddressesBalance}
                validatorMapsNeedUpdate={validatorMapsNeedUpdate}
                networkDataNeedsUpdate={networkDataNeedsUpdate}
                luckNeedsUpdate={luckNeedsUpdate}
                performanceNeedsUpdate={performanceNeedsUpdate}
                LYXPriceNeedsUpdate={LYXPriceNeedsUpdate}
                withdrawalAddressesBalanceNeedsUpdate={
                  withdrawalAddressesBalanceNeedsUpdate
                }
              />
            }
          ></Route>
          <Route
            path="/user"
            element={
              <UserPage
                publicKeys={publicKeys}
                setPublicKeys={setPublicKeys}
                setValidatorArray={setValidatorArray}
              />
            }
          ></Route>
          <Route
            path="/validators"
            element={
              <ValidatorsPage
                publicKeys={publicKeys}
                validatorArray={validatorArray}
                activeValidators={activeValidators}
                pendingValidators={pendingValidators}
                slashedValidators={slashedValidators}
                otherValidators={otherValidators}
              />
            }
          ></Route>
          <Route path="/terms" element={<TermsAndConditions />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/license" element={<License />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
