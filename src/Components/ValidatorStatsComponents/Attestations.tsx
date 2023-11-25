import { useContext, useEffect, useState } from 'react';

// types
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

// context
import { ValidatorsDataContext } from '../../App';

interface Props {
  selectedGroup: WithdrawalAddressesGroup;
}

export const Attestations: React.FC<Props> = ({ selectedGroup }) => {
  const { validatorsPerformance = {} } = useContext(ValidatorsDataContext);
  const [performance, setPerformance] = useState({
    totalExecutedAttestations: 0,
    totalMissedAttestations: 0,
    totalAttestationCount: 0,
    executedAttestationsPercentage: 0,
  });

  useEffect(() => {
    if (Object.getOwnPropertyNames(validatorsPerformance).length > 0) {
      let totalExecutedAttestations = 0;
      let totalMissedAttestations = 0;
      let totalAttestationCount = 0;

      for (let i = 0; i < selectedGroup.withdrawalAddresses.length; i++) {
        const withdrawalAddress = selectedGroup.withdrawalAddresses[i].address;

        for (const validatorIndex in validatorsPerformance[withdrawalAddress]) {
          totalExecutedAttestations +=
            validatorsPerformance[withdrawalAddress][validatorIndex]
              .attestationPerformance.executedAttestations;
          totalMissedAttestations +=
            validatorsPerformance[withdrawalAddress][validatorIndex]
              .attestationPerformance.missedAttestations;
          totalAttestationCount +=
            validatorsPerformance[withdrawalAddress][validatorIndex]
              .attestationPerformance.attestationCount;
        }
      }

      const executedAttestationsPercentage =
        (100 * totalExecutedAttestations) / totalAttestationCount;

      setPerformance({
        totalExecutedAttestations,
        totalMissedAttestations,
        totalAttestationCount,
        executedAttestationsPercentage,
      });
    }
  }, [selectedGroup, validatorsPerformance]);

  const returnColouredAttestationsPerformance = () => {
    if (performance.executedAttestationsPercentage > 90) {
      return (
        <p className="text-green-45 font-bold ml-1 text-left">{`${performance.executedAttestationsPercentage.toLocaleString()} %`}</p>
      );
    } else {
      return (
        <p className="text-red-55 font-bold ml-1 text-left">{`${performance.executedAttestationsPercentage.toLocaleString()} %`}</p>
      );
    }
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center text-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-purple-31">
            Attestations
          </h2>
          <div className="grid content-center grid-cols-2">
            <p className="paragraph-inter-14-medium mr-1 text-right">
              Executed:
            </p>
            <p className="text-green-45 font-bold ml-1 text-left">
              {performance.totalExecutedAttestations}
            </p>
            <p className="paragraph-inter-14-medium mr-1 text-right">Missed:</p>
            <p className="text-red-55 font-bold ml-1 text-left">
              {performance.totalMissedAttestations}
            </p>
            <p className="paragraph-inter-14-medium mr-1 text-right">
              Performance:
            </p>
            {returnColouredAttestationsPerformance()}
          </div>
        </div>
      </lukso-card>
    </div>
  );
};
