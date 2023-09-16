import { useEffect, useState } from "react";
import { PerformanceParams } from "../../typings/types";

export const Performance = ({
  tileClasses,
  validatorsPerformance,
  performanceNeedsUpdate,
}: PerformanceParams) => {
  const [efficiency, setEfficiency] = useState(0);
  const [efficiencyNeedsUpdate, setEfficiencyNeedsUpdate] = useState(true);

  useEffect(() => {
    if (
      Object.getOwnPropertyNames(validatorsPerformance).length > 0 &&
      efficiencyNeedsUpdate
    ) {
      let validatorCount = 0;
      let efficiencySum = 0;

      for (const validatorIndex in validatorsPerformance) {
        const validator = validatorsPerformance[validatorIndex];
        validatorCount++;
        efficiencySum += validator.attestationEfficiency.attestation_efficiency;
      }

      const newEfficiency = efficiencySum / validatorCount;
      setEfficiency(newEfficiency);
      setEfficiencyNeedsUpdate(false);
    }
  }, [validatorsPerformance, efficiencyNeedsUpdate]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Performance</div>
      {performanceNeedsUpdate ? (
        <div className="loading-animation" />
      ) : (
        <p className="text-gray-600 font-bold">{`${(efficiency * 100).toFixed(
          2
        )} %`}</p>
      )}
    </div>
  );
};
