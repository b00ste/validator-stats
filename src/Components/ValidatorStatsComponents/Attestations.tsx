import { useEffect, useState } from 'react';

// theme
import { validatorStatsSpecificTileClasses } from '../../Theme/theme';

// types
import { PerformanceParams } from '../../Types/ComponentParamsTypes';

export const Attestations = ({
  selectedGroup,
  validatorsPerformance,
}: PerformanceParams) => {
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
        <p className="text-pastel-green font-bold ml-1 text-left">{`${performance.executedAttestationsPercentage.toLocaleString()} %`}</p>
      );
    } else {
      return (
        <p className="text-pastel-red font-bold ml-1 text-left">{`${performance.executedAttestationsPercentage.toLocaleString()} %`}</p>
      );
    }
  };

  return (
    <div className={validatorStatsSpecificTileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Attestations</div>
      <div className="grid content-center grid-cols-2">
        <p className="text-slate-gray font-bold mr-1 text-right">Executed:</p>
        <p className="text-pastel-green font-bold ml-1 text-left">
          {performance.totalExecutedAttestations}
        </p>
        <p className="text-slate-gray font-bold mr-1 text-right">Missed:</p>
        <p className="text-pastel-red font-bold ml-1 text-left">
          {performance.totalMissedAttestations}
        </p>
        <p className="text-slate-gray font-bold mr-1 text-right">
          Performance:
        </p>
        {returnColouredAttestationsPerformance()}
      </div>
    </div>
  );
};
