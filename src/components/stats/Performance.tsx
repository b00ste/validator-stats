import { useEffect, useState } from "react";
import performance from "../../assets/performance.png";
import { ValidatorsPerformance } from "../../typings/types";

type PerformanceParams = {
  tileStyle: string;
  titleStyle: string;
  validatorsPerformance: ValidatorsPerformance;
};

export const Performance = ({
  tileStyle,
  titleStyle,
  validatorsPerformance,
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
    <div className={tileStyle}>
      <img src={performance} className="w-10 h-10" alt="performance" />
      <div>
        <p className={titleStyle}>Performance</p>
        <p>{`${(efficiency * 100).toFixed(2)} %`}</p>
      </div>
    </div>
  );
};
