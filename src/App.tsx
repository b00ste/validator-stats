import { useCallback, useEffect, useState } from "react";
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
} from "./typings/types";

function App() {
  // ------ Deposior/Withdrawal Addresses ------
  const storedPublicKeys = localStorage.getItem("publicKeys");
  const [publicKeys, setPublicKeys] = useState(
    (storedPublicKeys ? JSON.parse(storedPublicKeys) : undefined) as PublicKey[]
  );
  const [withdrawalAddressesBalance, setWithdrawalAddressesBalance] = useState(
    undefined as number | undefined
  );
  // -------------------------------------------

  // ------ Validators Pubkeys ------
  const storedValidatorArray = localStorage.getItem("validatorArray");
  const [validatorArray, setValidatorArray] = useState(
    (storedValidatorArray
      ? JSON.parse(storedValidatorArray)
      : undefined) as string[]
  );
  // --------------------------------

  // ------ Validator Data ------
  const [activeValidators, setActiveValidators] = useState(
    undefined as ValidatorMap | undefined
  );
  const [pendingValidators, setPendingValidators] = useState(
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
  // ----------------------------

  // ------ Network Data ------
  const [stakedLYX, setStakedLYX] = useState(undefined as number | undefined);
  const [currentEpoch, setCurrentEpoch] = useState(
    undefined as number | undefined
  );
  const [networkValidators, setNetworkValidators] = useState(
    undefined as number | undefined
  );
  // --------------------------

  // ------ Price Data ------
  const [eurPrice, setEurPrce] = useState(undefined as string | undefined);
  const [usdPrice, setUsdPrce] = useState(undefined as string | undefined);
  // --------------------------

  // ------ Handlers for Data Update ------
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
  // --------------------------------------

  // Save validators to local storage
  useEffect(() => {
    localStorage.setItem("validatorArray", JSON.stringify(validatorArray));
  }, [validatorArray]);

  // Update validators and withdrawal addresses balance if `publicKeys` changes
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

  // Update validators data (active/pending/slashed/other) if `validatorArray` changes
  useEffect(() => {
    if (validatorArray.length > 0) {
      updateValidatorsMaps();
    }
  }, [validatorArray, updateValidatorsMaps]);

  // Update validators luck & performance if `activeValidators` changes
  useEffect(() => {
    if (
      activeValidators &&
      Object.getOwnPropertyNames(activeValidators).length > 0
    ) {
      updateVaildatorsLuck();
      updateVaildatorsPerformance();
    }
  }, [activeValidators, updateVaildatorsLuck, updateVaildatorsPerformance]);

  // Fetch network data (validators count, staked LYX count and current epoch)
  useEffect(() => {
    if (!stakedLYX && !currentEpoch && !networkValidators) {
      updateNetworkData();
    }
  }, [stakedLYX, currentEpoch, networkValidators, updateNetworkData]);

  // Fetch LYX price in both EUR & USD
  useEffect(() => {
    if (!eurPrice && !usdPrice) {
      updateLYXPrice();
    }
  }, [eurPrice, usdPrice, updateLYXPrice]);

  // ------ Refresh Data ------
  useEffect(() => {
    const interval = setInterval(() => {
      updateValidatorHandler();
      updateWithdrawalAddressesBalanceHandler();
      updateValidatorsMaps();
      updateVaildatorsLuck();
      updateVaildatorsPerformance();
      updateNetworkData();
      updateLYXPrice();
    }, 60000);

    return () => clearInterval(interval);
  }, [
    updateValidatorHandler,
    updateWithdrawalAddressesBalanceHandler,
    updateValidatorsMaps,
    updateVaildatorsLuck,
    updateVaildatorsPerformance,
    updateNetworkData,
    updateLYXPrice,
  ]);
  // --------------------------

  // ------ Styling ------
  const bodyClasses =
    "min-h-screen relative flex flex-col justify-center items-center bg-soft-pink pt-44 pb-16";
  // ---------------------

  const validatorsMaps = {
    activeValidators: activeValidators ? activeValidators : {},
    pendingValidators: pendingValidators ? pendingValidators : {},
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

  return (
    <div className={bodyClasses}>
      <Router>
        <Header
          stakedLYX={stakedLYX ? stakedLYX : 0}
          currentEpoch={currentEpoch ? currentEpoch : 0}
          networkValidators={networkValidators ? networkValidators : 0}
          tokenPrice={tokenPrice}
        />
        <Routes>
          <Route
            path="/"
            element={
              <StatsPage
                stakedLYX={stakedLYX ? stakedLYX : 0}
                tokenPrice={tokenPrice}
                validatorsData={validatorsData}
                withdrawalAddressesBalance={
                  withdrawalAddressesBalance ? withdrawalAddressesBalance : 0
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
                validatorsMaps={validatorsMaps}
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
