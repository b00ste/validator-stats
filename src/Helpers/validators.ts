// constants
import { consensys_explorer } from './constants';

// types
import {
  Validator,
  ValidatorsWithdrawals,
  Attestation,
  ConsensusPerformance,
  ExecutionPerformance,
} from '../Types/FetchedDataTypes';
import {
  WithdrawalAddress,
  ValidatorMap,
  ValidatorsLuck,
  ValidatorsPerformance,
} from '../Types/UsedDataTypes';
import { generateUUID } from './utils';

const fetchValidatorDataByLink = async (link: string, validators: string[]) => {
  if (validators.length === 0) {
    return [];
  } else if (validators.length <= 100) {
    let dataCollection = [] as any[];
    try {
      await fetch(
        link.replace(
          '{validators}',
          validators.toString().replaceAll(',', '%2C'),
        ),
        {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      )
        .then((res) => res.json())
        .then(({ data }) => (dataCollection = data));
    } catch (error) {}

    return dataCollection;
  } else {
    let dataCollection = [] as any[];
    let i = 0;
    for (i; i < validators.length; i += 100) {
      try {
        await fetch(
          link.replace(
            '{validators}',
            validators
              .slice(i, i + 100)
              .toString()
              .replaceAll(',', '%2C'),
          ),
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
            },
          },
        ).then((res) =>
          res.json().then(({ data }) => dataCollection.push(data)),
        );
      } catch (error) {}
    }

    return dataCollection;
  }
};

export const fetchValidators = async (
  withdrawalAddresses: WithdrawalAddress[],
) => {
  const validators: Record<string, string[]> = {};
  const validatorMap: Record<string, boolean> = {};
  for (let i = 0; i < withdrawalAddresses.length; i++) {
    let limitReached = false;
    let offset = 0;
    while (!limitReached) {
      let elementsFound = 0;
      try {
        await fetch(
          `${consensys_explorer}/api/v1/validator/withdrawalCredentials/${withdrawalAddresses[i].address}?limit=200&offset=${offset}`,
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
            },
          },
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
                  if (validators[withdrawalAddresses[i].address]) {
                    validators[withdrawalAddresses[i].address].push(
                      data[j].publickey,
                    );
                  } else {
                    validators[withdrawalAddresses[i].address] = [];
                    validators[withdrawalAddresses[i].address].push(
                      data[j].publickey,
                    );
                  }
                }
              }
            },
          );
      } catch (error) {}

      if (elementsFound < 200) {
        limitReached = true;
      } else {
        offset += 200;
      }
    }
  }
  return validators ? validators : {};
};

export const fetchValidatorsData = async (
  validators: Record<string, string[]>,
) => {
  let activeValidators = {} as Record<string, ValidatorMap>;
  let pendingValidators = {} as Record<string, ValidatorMap>;
  let offlineValidators = {} as Record<string, ValidatorMap>;
  let slashedValidators = {} as Record<string, ValidatorMap>;
  let otherValidators = {} as Record<string, ValidatorMap>;

  for (const pubKey in validators) {
    const validatorArray = validators[pubKey];

    if (validatorArray.length > 100) {
      const dataCollection: Validator[][] = await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}`,
        validatorArray,
      );

      for (let i = 0; i < dataCollection.length; i++) {
        for (let j = 0; j < dataCollection[i].length; j++) {
          const validatorData = dataCollection[i][j];
          if (validatorData.slashed) {
            if (!slashedValidators[pubKey]) {
              slashedValidators[pubKey] = {};
            }

            slashedValidators[pubKey][validatorData.pubkey] = {
              ...validatorData,
              key: generateUUID(),
            };
          } else if (validatorData.status === 'active_online') {
            if (!activeValidators[pubKey]) {
              activeValidators[pubKey] = {};
            }

            activeValidators[pubKey][validatorData.pubkey] = {
              ...validatorData,
              key: generateUUID(),
            };
          } else if (validatorData.status === 'pending') {
            if (!pendingValidators[pubKey]) {
              pendingValidators[pubKey] = {};
            }

            pendingValidators[pubKey][validatorData.pubkey] = {
              ...validatorData,
              key: generateUUID(),
            };
          } else if (validatorData.status === 'active_offline') {
            if (!offlineValidators[pubKey]) {
              offlineValidators[pubKey] = {};
            }

            offlineValidators[pubKey][validatorData.pubkey] = {
              ...validatorData,
              key: generateUUID(),
            };
          } else {
            if (!otherValidators[pubKey]) {
              otherValidators[pubKey] = {};
            }

            otherValidators[pubKey][validatorData.pubkey] = {
              ...validatorData,
              key: generateUUID(),
            };
          }
        }
      }
    } else {
      const dataCollection: Validator[] = await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}`,
        validatorArray,
      );

      for (let i = 0; i < dataCollection.length; i++) {
        const validatorData = dataCollection[i];
        if (validatorData.slashed) {
          if (!slashedValidators[pubKey]) {
            slashedValidators[pubKey] = {};
          }

          slashedValidators[pubKey][validatorData.pubkey] = validatorData;
        } else if (validatorData.status === 'active_online') {
          if (!activeValidators[pubKey]) {
            activeValidators[pubKey] = {};
          }

          activeValidators[pubKey][validatorData.pubkey] = validatorData;
        } else if (validatorData.status === 'pending') {
          if (!pendingValidators[pubKey]) {
            pendingValidators[pubKey] = {};
          }

          pendingValidators[pubKey][validatorData.pubkey] = validatorData;
        } else if (validatorData.status === 'active_offline') {
          if (!offlineValidators[pubKey]) {
            offlineValidators[pubKey] = {};
          }

          offlineValidators[pubKey][validatorData.pubkey] = validatorData;
        } else {
          if (!otherValidators[pubKey]) {
            otherValidators[pubKey] = {};
          }

          otherValidators[pubKey][validatorData.pubkey] = validatorData;
        }
      }
    }
  }

  return {
    activeValidators,
    pendingValidators,
    offlineValidators,
    slashedValidators,
    otherValidators,
  };
};

export const fetchValidatorsLuck = async (
  activeValidators: Record<string, ValidatorMap>,
) => {
  let validatorsLuck: Record<string, ValidatorsLuck> = {};

  for (const pubKey in activeValidators) {
    const validatorMap = activeValidators[pubKey];
    const validatorPubKeys = Object.getOwnPropertyNames(validatorMap);

    if (validatorPubKeys.length > 100) {
      let dataCollection = (await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validators/proposalLuck?validators={validators}`,
        validatorPubKeys,
      )) as ValidatorsLuck[];

      let percentageSum = 0;
      let sampleSizeSum = 0;

      dataCollection.forEach((elem, index) => {
        if (elem.proposal_luck) {
          percentageSum += elem.proposal_luck;

          if (index === dataCollection.length - 1) {
            sampleSizeSum += validatorPubKeys.length - 100 * index;
          } else {
            sampleSizeSum += 100;
          }
        }
      });

      validatorsLuck[pubKey] = {
        average_proposal_interval: 0,
        next_proposal_estimate_ts: 0,
        proposal_luck: (percentageSum / sampleSizeSum) * 100,
        time_frame_name: '',
        sampleSize: validatorPubKeys.length,
      };
    } else {
      try {
        await fetch(
          `${consensys_explorer}/api/v1/validators/proposalLuck?validators=${validatorPubKeys
            .toString()
            .replaceAll(',', '%2C')}`,
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
            },
          },
        )
          .then((res) => res.json())
          .then(
            ({ data }: { data: ValidatorsLuck }) =>
              (validatorsLuck[pubKey] = data),
          );
      } catch (error) {}
    }
  }

  return validatorsLuck;
};

export const fetchValidatorsPerformance = async (
  activeValidators: Record<string, ValidatorMap>,
) => {
  const performanceData: Record<string, ValidatorsPerformance> = {};

  for (const pubKey in activeValidators) {
    const validatorMap = activeValidators[pubKey];
    const validatorPubKeys = Object.getOwnPropertyNames(validatorMap);

    if (validatorPubKeys.length > 100) {
      const attestations: Attestation[][] = await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/attestations`,
        validatorPubKeys,
      );
      const consensusPerformance: ConsensusPerformance[][] =
        await fetchValidatorDataByLink(
          `${consensys_explorer}/api/v1/validator/{validators}/performance`,
          validatorPubKeys,
        );
      const executionPerformance: ExecutionPerformance[][] =
        await fetchValidatorDataByLink(
          `${consensys_explorer}/api/v1/validator/{validators}/execution/performance`,
          validatorPubKeys,
        );

      for (let i = 0; i < attestations.length; i++) {
        for (let j = 0; j < attestations[i].length; j++) {
          const { validatorindex, status } = attestations[i][j];

          if (!performanceData[pubKey]) {
            performanceData[pubKey] = {};
          }

          if (!performanceData[pubKey][validatorindex]) {
            performanceData[pubKey][validatorindex] = {
              ...performanceData[pubKey][validatorindex],
              attestationPerformance: {
                executedAttestations: 0,
                missedAttestations: 0,
                attestationCount: 0,
              },
            };
          }

          const { executedAttestations, missedAttestations, attestationCount } =
            performanceData[pubKey][validatorindex].attestationPerformance;
          if (status === 1) {
            const newAttestationPerformance = {
              executedAttestations: executedAttestations + 1,
              missedAttestations,
              attestationCount: attestationCount + 1,
            };
            performanceData[pubKey][validatorindex].attestationPerformance =
              newAttestationPerformance;
          } else {
            const newAttestationPerformance = {
              executedAttestations,
              missedAttestations: missedAttestations + 1,
              attestationCount: attestationCount + 1,
            };
            performanceData[pubKey][validatorindex].attestationPerformance =
              newAttestationPerformance;
          }
        }
      }
      for (let i = 0; i < consensusPerformance.length; i++) {
        for (let j = 0; j < consensusPerformance[i].length; j++) {
          const { validatorindex } = consensusPerformance[i][j];
          performanceData[pubKey][validatorindex] = {
            ...performanceData[pubKey][validatorindex],
            consensusPerformance: consensusPerformance[i][j],
          };
        }
      }
      for (let i = 0; i < executionPerformance.length; i++) {
        for (let j = 0; j < executionPerformance[i].length; j++) {
          const { validatorindex } = executionPerformance[i][j];
          performanceData[pubKey][validatorindex] = {
            ...performanceData[pubKey][validatorindex],
            executionPerformance: executionPerformance[i][j],
          };
        }
      }
    } else {
      const attestations: Attestation[] = await fetchValidatorDataByLink(
        `${consensys_explorer}/api/v1/validator/{validators}/attestations`,
        validatorPubKeys,
      );
      const consensusPerformance: ConsensusPerformance[] =
        await fetchValidatorDataByLink(
          `${consensys_explorer}/api/v1/validator/{validators}/performance`,
          validatorPubKeys,
        );
      const executionPerformance: ExecutionPerformance[] =
        await fetchValidatorDataByLink(
          `${consensys_explorer}/api/v1/validator/{validators}/execution/performance`,
          validatorPubKeys,
        );

      for (let i = 0; i < attestations.length; i++) {
        const { validatorindex, status } = attestations[i];

        if (!performanceData[pubKey]) {
          performanceData[pubKey] = {};
        }

        if (!performanceData[pubKey][validatorindex]) {
          performanceData[pubKey][validatorindex] = {
            ...performanceData[pubKey][validatorindex],
            attestationPerformance: {
              executedAttestations: 0,
              missedAttestations: 0,
              attestationCount: 0,
            },
          };
        }

        const { executedAttestations, missedAttestations, attestationCount } =
          performanceData[pubKey][validatorindex].attestationPerformance;
        if (status === 1) {
          const newAttestationPerformance = {
            executedAttestations: executedAttestations + 1,
            missedAttestations,
            attestationCount: attestationCount + 1,
          };
          performanceData[pubKey][validatorindex].attestationPerformance =
            newAttestationPerformance;
        } else {
          const newAttestationPerformance = {
            executedAttestations,
            missedAttestations: missedAttestations + 1,
            attestationCount: attestationCount + 1,
          };
          performanceData[pubKey][validatorindex].attestationPerformance =
            newAttestationPerformance;
        }
      }
      for (let i = 0; i < consensusPerformance.length; i++) {
        const { validatorindex } = consensusPerformance[i];
        performanceData[pubKey][validatorindex] = {
          ...performanceData[pubKey][validatorindex],
          consensusPerformance: consensusPerformance[i],
        };
      }
      for (let i = 0; i < executionPerformance.length; i++) {
        const { validatorindex } = executionPerformance[i];
        performanceData[pubKey][validatorindex] = {
          ...performanceData[pubKey][validatorindex],
          executionPerformance: executionPerformance[i],
        };
      }
    }
  }

  return performanceData;
};

export const fetchValidatorsWithdrawals = async (
  activeValidators: Record<string, ValidatorMap>,
) => {
  const withdrawalsData: Record<string, ValidatorsWithdrawals[]> = {};

  for (const pubKey in activeValidators) {
    const validatorMap = activeValidators[pubKey];
    const validatorPubKeys = Object.getOwnPropertyNames(validatorMap);

    const withdrawals: ValidatorsWithdrawals[] = await fetchValidatorDataByLink(
      `${consensys_explorer}/api/v1/validator/{validators}/withdrawals`,
      validatorPubKeys,
    );

    withdrawalsData[pubKey] = withdrawals;
  }

  return withdrawalsData;
};
