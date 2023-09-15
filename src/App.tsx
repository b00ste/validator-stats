import { useEffect, useState } from "react";

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
import { fetchValidators, fetchValidatorsData } from "./helpers/validators";
import { getLastEpoch } from "./helpers/network";

// ts types
import { PublicKey, ValidatorMap } from "./typings/types";

function App() {
  const [page, setPage] = useState("stats");

  // Addresses used to get the validators. (deposior/withdrawal address)
  const storedPublicKeys = localStorage.getItem("publicKeys");
  const [publicKeys, setPublicKeys] = useState(
    (storedPublicKeys ? JSON.parse(storedPublicKeys) : []) as PublicKey[]
  );

  // The pubkeys of the validators
  const storedValidatorArray = localStorage.getItem("validatorArray");
  const [validatorArray, setValidatorArray] = useState(
    (storedValidatorArray ? JSON.parse(storedValidatorArray) : []) as string[]
  );

  // Validator data for active/pending validators
  const [activeValidators, setActiveValidators] = useState({} as ValidatorMap);
  const [pendingValidators, setPendingValidators] = useState(
    {} as ValidatorMap
  );
  const [slashedValidators, setSlashedValidators] = useState(
    {} as ValidatorMap
  );
  const [otherValidators, setOtherValidators] = useState({} as ValidatorMap);
  const [validatorMapsNeedUpdate, setValidatorMapsNeedUpdate] = useState(true);

  const [stakedLYX, setStakedLYX] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [networkValidators, setNetworkValidators] = useState(0);
  const [networkDataNeedsUpdate, setNetworkDataNeedsUpdate] = useState(true);

  // Save validators to local storage
  useEffect(() => {
    localStorage.setItem("validatorArray", JSON.stringify(validatorArray));
  }, [validatorArray]);

  // Fetch validators and filter them based on withdrawal address
  useEffect(() => {
    if (validatorArray.length === 0) {
      const fetchedData = fetchValidators(publicKeys);

      fetchedData.then((data) => setValidatorArray(data));
    }
  }, [validatorArray.length, publicKeys, setValidatorArray]);

  // Update validators data (active/pending)
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

  // Fetch validators count, staked LYX count and current epoch
  useEffect(() => {
    if (networkDataNeedsUpdate) {
      const fetchedData = getLastEpoch();

      fetchedData.then((epoch) => {
        setStakedLYX(epoch.totalvalidatorbalance);
        setCurrentEpoch(epoch.epoch);
        setNetworkValidators(epoch.validatorscount);
      });

      setNetworkDataNeedsUpdate(false);
    }
  }, [networkDataNeedsUpdate]);

  switch (page) {
    case "stats": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <StatsPage
            publicKeys={publicKeys}
            stakedLYX={stakedLYX}
            activeValidators={activeValidators}
            pendingValidators={pendingValidators}
            slashedValidators={slashedValidators}
            otherValidators={otherValidators}
            validatorMapsNeedUpdate={validatorMapsNeedUpdate}
            setValidatorMapsNeedUpdate={setValidatorMapsNeedUpdate}
            networkDataNeedsUpdate={networkDataNeedsUpdate}
            setNetworkDataNeedsUpdate={setNetworkDataNeedsUpdate}
          />
          <Footer setPage={setPage} />
        </div>
      );
    }
    case "user": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <UserPage publicKeys={publicKeys} setPublicKeys={setPublicKeys} />
          <Footer setPage={setPage} />
        </div>
      );
    }
    case "validators": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <ValidatorsPage
            validatorArray={validatorArray}
            activeValidators={activeValidators}
            pendingValidators={pendingValidators}
            slashedValidators={slashedValidators}
            otherValidators={otherValidators}
          />
          <Footer setPage={setPage} />
        </div>
      );
    }
    case "terms": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <TermsAndConditions />
          <Footer setPage={setPage} />
        </div>
      );
    }
    case "privacy": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <PrivacyPolicy />
          <Footer setPage={setPage} />
        </div>
      );
    }
    case "license": {
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <Header
            setPage={setPage}
            stakedLYX={stakedLYX}
            currentEpoch={currentEpoch}
            networkValidators={networkValidators}
          />
          <License />
          <Footer setPage={setPage} />
        </div>
      );
    }
    default:
      return (
        <div className="bg-soft-pink flex flex-col justify-center items-center min-h-screen">
          <p className="font-extrabold text-3xl">
            Error! Something unexpected happened.
          </p>
        </div>
      );
  }
}

export default App;
