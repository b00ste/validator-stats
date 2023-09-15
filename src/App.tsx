import { useEffect, useState } from "react";
import { UserPage } from "./components/UserPage";
import { StatsPage } from "./components/StatsPage";

import { PublicKey, ValidatorMap } from "./typings/types";
import { fetchValidators, fetchValidatorsData } from "./helpers/validators";
import { PageSwitch } from "./components/PageSwitch";
import { ValidatorsPage } from "./components/ValidatorsPage";

function App() {
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

  const [activeValidators, setActiveValidators] = useState({} as ValidatorMap);
  const [pendingValidators, setPendingValidators] = useState(
    {} as ValidatorMap
  );

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

  // Update validators balance
  useEffect(() => {
    if (
      validatorArray.length > 0 &&
      Object.getOwnPropertyNames(activeValidators).length === 0 &&
      Object.getOwnPropertyNames(pendingValidators).length === 0
    ) {
      const fetchedData = fetchValidatorsData(validatorArray);

      fetchedData.then((data) => {
        setActiveValidators(data.activeValidators);
        setPendingValidators(data.pendingValidators);
      });
    }
  }, [validatorArray, activeValidators, pendingValidators]);

  const [page, setPage] = useState("stats");

  switch (page) {
    case "stats": {
      return (
        <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
          <StatsPage
            publicKeys={publicKeys}
            activeValidators={activeValidators}
            pendingValidators={pendingValidators}
          />
          <PageSwitch setPage={setPage} />
        </div>
      );
    }
    case "user": {
      return (
        <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
          <UserPage publicKeys={publicKeys} setPublicKeys={setPublicKeys} />
          <PageSwitch setPage={setPage} />
        </div>
      );
    }
    case "list": {
      return (
        <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
          <ValidatorsPage
            validatorArray={validatorArray}
            activeValidators={activeValidators}
            pendingValidators={pendingValidators}
          />
          <PageSwitch setPage={setPage} />
        </div>
      );
    }
    default:
      return (
        <div className="flex items-center justify-center min-h-screen bg-pink-300 dark:bg-pink-500">
          <p className="font-extrabold text-3xl">
            Error! Something unexpected happened.
          </p>
        </div>
      );
  }
}

export default App;
