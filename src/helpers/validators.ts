import {
  AttestationEfficiency,
  ConsensusPerformance,
  ExecutionPerformance,
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
  ValidatorsWithdrawals,
} from "../typings/types";
import { consensys_explorer } from "./constants";

export const fetchValidators = async (publicKeys: PublicKey[]) => {
  const validatorArray: string[] = [];
  const validatorMap: Record<string, boolean> = {};
  for (let i = 0; i < publicKeys.length; i++) {
    await fetch(
      `${consensys_explorer}/api/v1/validator/withdrawalCredentials/${publicKeys[i].address}?limit=200`
    )
      .then((res) => res.json())
      .then(
        ({
          data,
        }: {
          data: { publickey: string; validatorindex: number }[];
        }) => {
          for (let j = 0; j < data.length; j++) {
            if (!validatorMap[data[j].publickey]) {
              validatorMap[data[j].publickey] = true;

              // Add entry to array
              validatorArray.push(data[j].publickey);
            }
          }
        }
      );
  }
  return validatorArray;
};

const fetchValidatorData = async (link: string, validators: string[]) => {
  if (validators.length === 0) {
    return [];
  } else if (validators.length <= 100) {
    let dataCollection = [] as any[];
    await fetch(
      link.replace("{validators}", validators.toString().replaceAll(",", "%2C"))
    )
      .then((res) => res.json())
      .then(({ data }) => (dataCollection = data));

    return dataCollection;
  } else {
    let dataCollection = [] as any[];
    let i = 0;
    for (i; i < validators.length; i += 100) {
      await fetch(
        link.replace(
          "{validators}",
          validators
            .slice(i, i + 100)
            .toString()
            .replaceAll(",", "%2C")
        )
      ).then((res) => res.json().then(({ data }) => dataCollection.push(data)));
    }

    if (i - validators.length > 0) {
      await fetch(
        link.replace(
          "{validators}",
          validators
            .slice(i - 100, validators.length)
            .toString()
            .replaceAll(",", "%2C")
        )
      ).then((res) => res.json().then(({ data }) => dataCollection.push(data)));
    }

    return dataCollection;
  }
};

export const fetchValidatorsBalance = async (validatorArray: string[]) => {
  const dataCollection: {
    pubkey: string;
    balance: number;
    status: string;
    validatorindex: number;
  }[][] = await fetchValidatorData(
    `${consensys_explorer}/api/v1/validator/{validators}`,
    validatorArray
  );

  let activeValidators = {} as ValidatorMap;
  let pendingValidators = {} as ValidatorMap;
  for (let i = 0; i < dataCollection.length; i++) {
    for (let j = 0; j < dataCollection[i].length; j++) {
      const { pubkey, balance, status, validatorindex } = dataCollection[i][j];
      if (status === "active_online") {
        activeValidators[pubkey] = { validatorindex, balance };
      } else if (status === "pending") {
        pendingValidators[pubkey] = { validatorindex, balance };
      } else continue;
    }
  }

  return { activeValidators, pendingValidators };
};

export const fetchValidatorsLuck = async (activeValidators: ValidatorMap) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  let dataCollection = {} as ValidatorsLuck;
  await fetch(
    `${consensys_explorer}/api/v1/validators/proposalLuck?validators=${pubkeys
      .toString()
      .replaceAll(",", "%2C")}`
  )
    .then((res) => res.json())
    .then(({ data }) => (dataCollection = data));

  return dataCollection;
};

export const fetchValidatorsPerformance = async (
  activeValidators: ValidatorMap
) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  const attestationEfficiency: AttestationEfficiency[] =
    await fetchValidatorData(
      `${consensys_explorer}/api/v1/validator/{validators}/attestationefficiency`,
      pubkeys
    );
  const consensusPerformance: ConsensusPerformance[] = await fetchValidatorData(
    `${consensys_explorer}/api/v1/validator/{validators}/performance`,
    pubkeys
  );
  const executionPerformance: ExecutionPerformance[] = await fetchValidatorData(
    `${consensys_explorer}/api/v1/validator/{validators}/execution/performance`,
    pubkeys
  );

  const performanceData: ValidatorsPerformance = {};

  for (let i = 0; i < attestationEfficiency.length; i++) {
    const { validatorindex } = attestationEfficiency[i];
    performanceData[validatorindex] = {
      ...performanceData[validatorindex],
      attestationEfficiency: attestationEfficiency[i],
    };
  }
  for (let i = 0; i < consensusPerformance.length; i++) {
    const { validatorindex } = consensusPerformance[i];
    performanceData[validatorindex] = {
      ...performanceData[validatorindex],
      consensusPerformance: consensusPerformance[i],
    };
  }
  for (let i = 0; i < executionPerformance.length; i++) {
    const { validatorindex } = executionPerformance[i];
    performanceData[validatorindex] = {
      ...performanceData[validatorindex],
      executionPerformance: executionPerformance[i],
    };
  }

  return performanceData;
};

export const fetchValidatorsWithdrawals = async (
  activeValidators: ValidatorMap
) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  const withdrawals: ValidatorsWithdrawals[] = await fetchValidatorData(
    `${consensys_explorer}/api/v1/validator/{validators}/withdrawals`,
    pubkeys
  );

  return withdrawals;
};
