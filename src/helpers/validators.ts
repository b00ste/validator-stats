// constants
import { consensys_explorer } from "./constants";

// types
import {
  Validator,
  ValidatorsWithdrawals,
  Attestation,
  ConsensusPerformance,
  ExecutionPerformance,
} from "../typings/FetchedDataTypes";
import {
  PublicKey,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
} from "../typings/UsedDataTypes";

const fetchValidatorDataByLink = async (link: string, validators: string[]) => {
  if (validators.length === 0) {
    return [];
  } else if (validators.length <= 100) {
    let dataCollection = [] as any[];
    await fetch(
      link.replace(
        "{validators}",
        validators.toString().replaceAll(",", "%2C")
      ),
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
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
        ),
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
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
        ),
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      ).then((res) => res.json().then(({ data }) => dataCollection.push(data)));
    }

    return dataCollection;
  }
};

export const fetchValidators = async (publicKeys: PublicKey[]) => {
  const validatorArray: string[] = [];
  const validatorMap: Record<string, boolean> = {};
  for (let i = 0; i < publicKeys.length; i++) {
    let limitReached = false;
    let offset = 0;
    while (!limitReached) {
      let elementsFound = 0;
      await fetch(
        `${consensys_explorer}/api/v1/validator/withdrawalCredentials/${publicKeys[i].address}?limit=200&offset=${offset}`,
        {
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
          },
        }
      )
        .then((res) => res.json())
        .then(
          ({
            data,
          }: {
            data: { publickey: string; validatorindex: number }[];
          }) => {
            elementsFound = data.length;
            for (let j = 0; j < data.length; j++) {
              if (!validatorMap[data[j].publickey]) {
                validatorMap[data[j].publickey] = true;

                // Add entry to array
                validatorArray.push(data[j].publickey);
              }
            }
          }
        );

      if (elementsFound < 200) {
        limitReached = true;
      } else {
        offset += 200;
      }
    }
  }
  return validatorArray ? validatorArray : [];
};

export const fetchValidatorsData = async (validatorArray: string[]) => {
  if (validatorArray.length > 100) {
    const dataCollection: Validator[][] = await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validator/{validators}`,
      validatorArray
    );

    let slashedValidators = {} as ValidatorMap;
    let activeValidators = {} as ValidatorMap;
    let pendingValidators = {} as ValidatorMap;
    let otherValidators = {} as ValidatorMap;
    for (let i = 0; i < dataCollection.length; i++) {
      for (let j = 0; j < dataCollection[i].length; j++) {
        const validatorData = dataCollection[i][j];
        if (validatorData.slashed) {
          slashedValidators[validatorData.pubkey] = validatorData;
        } else if (validatorData.status === "active_online") {
          activeValidators[validatorData.pubkey] = validatorData;
        } else if (validatorData.status === "pending") {
          pendingValidators[validatorData.pubkey] = validatorData;
        } else {
          otherValidators[validatorData.pubkey] = validatorData;
        }
      }
    }

    return {
      slashedValidators,
      activeValidators,
      pendingValidators,
      otherValidators,
    };
  } else {
    const dataCollection: Validator[] = await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validator/{validators}`,
      validatorArray
    );

    let slashedValidators = {} as ValidatorMap;
    let activeValidators = {} as ValidatorMap;
    let pendingValidators = {} as ValidatorMap;
    let otherValidators = {} as ValidatorMap;
    for (let i = 0; i < dataCollection.length; i++) {
      const validatorData = dataCollection[i];
      if (validatorData.slashed) {
        slashedValidators[validatorData.pubkey] = validatorData;
      } else if (validatorData.status === "active_online") {
        activeValidators[validatorData.pubkey] = validatorData;
      } else if (validatorData.status === "pending") {
        pendingValidators[validatorData.pubkey] = validatorData;
      } else {
        otherValidators[validatorData.pubkey] = validatorData;
      }
    }

    return {
      slashedValidators,
      activeValidators,
      pendingValidators,
      otherValidators,
    };
  }
};

export const fetchValidatorsLuck = async (activeValidators: ValidatorMap) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  let validatorsLuck: ValidatorsLuck = {
    average_proposal_interval: 0,
    next_proposal_estimate_ts: 0,
    proposal_luck: 0,
    time_frame_name: "",
  };

  if (pubkeys.length > 100) {
    let dataCollection = (await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validators/proposalLuck?validators={validators}`,
      pubkeys
    )) as ValidatorsLuck[];

    dataCollection.forEach((elem) => {
      if (elem.proposal_luck) {
        validatorsLuck.proposal_luck += elem.proposal_luck;
        validatorsLuck.proposal_luck = validatorsLuck.proposal_luck / 2;
      }
    });
  } else {
    await fetch(
      `${consensys_explorer}/api/v1/validators/proposalLuck?validators=${pubkeys
        .toString()
        .replaceAll(",", "%2C")}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    )
      .then((res) => res.json())
      .then(({ data }: { data: ValidatorsLuck }) => (validatorsLuck = data));
  }

  return validatorsLuck;
};

export const fetchValidatorsPerformance = async (
  activeValidators: ValidatorMap
) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  const performanceData: ValidatorsPerformance = {};

  if (pubkeys.length > 100) {
    const attestations: Attestation[][] = await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validator/{validators}/attestations`,
      pubkeys
    );
    const consensusPerformance: ConsensusPerformance[][] =
      await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/performance`,
        pubkeys
      );
    const executionPerformance: ExecutionPerformance[][] =
      await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/execution/performance`,
        pubkeys
      );

    for (let i = 0; i < attestations.length; i++) {
      for (let j = 0; j < attestations[i].length; j++) {
        const { validatorindex, status } = attestations[i][j];

        if (!performanceData[validatorindex]) {
          performanceData[validatorindex] = {
            ...performanceData[validatorindex],
            attestationPerformance: {
              executedAttestations: 0,
              missedAttestations: 0,
              attestationCount: 0,
            },
          };
        }

        const { executedAttestations, missedAttestations, attestationCount } =
          performanceData[validatorindex].attestationPerformance;
        if (status === 1) {
          const newAttestationPerformance = {
            executedAttestations: executedAttestations + 1,
            missedAttestations,
            attestationCount: attestationCount + 1,
          };
          performanceData[validatorindex].attestationPerformance =
            newAttestationPerformance;
        } else {
          const newAttestationPerformance = {
            executedAttestations,
            missedAttestations: missedAttestations + 1,
            attestationCount: attestationCount + 1,
          };
          performanceData[validatorindex].attestationPerformance =
            newAttestationPerformance;
        }
      }
    }
    for (let i = 0; i < consensusPerformance.length; i++) {
      for (let j = 0; j < consensusPerformance[i].length; j++) {
        const { validatorindex } = consensusPerformance[i][j];
        performanceData[validatorindex] = {
          ...performanceData[validatorindex],
          consensusPerformance: consensusPerformance[i][j],
        };
      }
    }
    for (let i = 0; i < executionPerformance.length; i++) {
      for (let j = 0; j < executionPerformance[i].length; j++) {
        const { validatorindex } = executionPerformance[i][j];
        performanceData[validatorindex] = {
          ...performanceData[validatorindex],
          executionPerformance: executionPerformance[i][j],
        };
      }
    }
  } else {
    const attestations: Attestation[] = await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validator/{validators}/attestations`,
      pubkeys
    );
    const consensusPerformance: ConsensusPerformance[] =
      await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/performance`,
        pubkeys
      );
    const executionPerformance: ExecutionPerformance[] =
      await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/execution/performance`,
        pubkeys
      );

    for (let i = 0; i < attestations.length; i++) {
      const { validatorindex, status } = attestations[i];

      if (!performanceData[validatorindex]) {
        performanceData[validatorindex] = {
          ...performanceData[validatorindex],
          attestationPerformance: {
            executedAttestations: 0,
            missedAttestations: 0,
            attestationCount: 0,
          },
        };
      }

      const { executedAttestations, missedAttestations, attestationCount } =
        performanceData[validatorindex].attestationPerformance;
      if (status === 1) {
        const newAttestationPerformance = {
          executedAttestations: executedAttestations + 1,
          missedAttestations,
          attestationCount: attestationCount + 1,
        };
        performanceData[validatorindex].attestationPerformance =
          newAttestationPerformance;
      } else {
        const newAttestationPerformance = {
          executedAttestations,
          missedAttestations: missedAttestations + 1,
          attestationCount: attestationCount + 1,
        };
        performanceData[validatorindex].attestationPerformance =
          newAttestationPerformance;
      }
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
  }

  return performanceData;
};

export const fetchValidatorsWithdrawals = async (
  activeValidators: ValidatorMap
) => {
  const pubkeys = Object.getOwnPropertyNames(activeValidators);

  const withdrawals: ValidatorsWithdrawals[] = await fetchValidatorDataByLink(
    `${consensys_explorer}/api/v1/validator/{validators}/withdrawals`,
    pubkeys
  );

  return withdrawals;
};
