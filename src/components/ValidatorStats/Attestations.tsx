import { useEffect, useState } from "react";
import { PerformanceParams } from "../../typings/ComponentParamsTypes";

export const Attestations = ({
  tileClasses,
  validatorsPerformance,
}: PerformanceParams) => {
  const [performance, setPerformance] = useState({
    totalExecutedAttestations: 0,
    totalMissedAttestations: 0,
    totalAttestationCount: 0,
    executedAttestationsPercentage: 0,
  });
  const [performanceNeedsUpdate, setPerformanceNeedsUpdate] = useState(true);

  useEffect(() => {
    if (
      Object.getOwnPropertyNames(validatorsPerformance).length > 0 &&
      performanceNeedsUpdate
    ) {
      let totalExecutedAttestations = 0;
      let totalMissedAttestations = 0;
      let totalAttestationCount = 0;
      for (const validatorIndex in validatorsPerformance) {
        totalExecutedAttestations +=
          validatorsPerformance[validatorIndex].attestationPerformance
            .executedAttestations;
        totalMissedAttestations +=
          validatorsPerformance[validatorIndex].attestationPerformance
            .missedAttestations;
        totalAttestationCount +=
          validatorsPerformance[validatorIndex].attestationPerformance
            .attestationCount;
      }

      const executedAttestationsPercentage =
        (100 * totalExecutedAttestations) / totalAttestationCount;

      setPerformance({
        totalExecutedAttestations,
        totalMissedAttestations,
        totalAttestationCount,
        executedAttestationsPercentage,
      });

      setPerformanceNeedsUpdate(false);
    }
  }, [validatorsPerformance, performanceNeedsUpdate]);

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
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Attestations</div>
      <div className="grid content-center grid-cols-2">
        <p className="text-gray-600 font-bold mr-1 text-right">Executed:</p>
        <p className="text-pastel-green font-bold ml-1 text-left">
          {performance.totalExecutedAttestations}
        </p>
        <p className="text-gray-600 font-bold mr-1 text-right">Missed:</p>
        <p className="text-pastel-red font-bold ml-1 text-left">
          {performance.totalMissedAttestations}
        </p>
        <p className="text-gray-600 font-bold mr-1 text-right">Performance:</p>
        {returnColouredAttestationsPerformance()}
      </div>
    </div>
  );
};
