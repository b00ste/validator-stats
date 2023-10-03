import { useEffect, useState } from 'react';
import { LuckParams } from '../../Types/ComponentParamsTypes';

export const Luck = ({
  tileClasses,
  selectedGroup,
  validatorsLuck,
}: LuckParams) => {
  const [proposalLuck, setProposalLuck] = useState(0);

  useEffect(() => {
    const withdrawalAddresses = selectedGroup.withdrawalAddresses;
    if (withdrawalAddresses.length === 1) {
      setProposalLuck(
        validatorsLuck[withdrawalAddresses[0].address].proposal_luck,
      );
    } else {
      let sum = 0;

      for (let i = 0; i < withdrawalAddresses.length; i++) {
        const withdrawalAddress = withdrawalAddresses[i].address;
        const elem = validatorsLuck[withdrawalAddress];

        if (elem) {
          sum += elem.proposal_luck;
        }
      }

      setProposalLuck(sum);
    }
  }, [selectedGroup, validatorsLuck]);

  return (
    <div className={tileClasses}>
      <div className="text-pastel-blue text-xl mb-2">Luck</div>
      <p className="text-slate-gray font-bold">
        {`${proposalLuck.toLocaleString()} %`}
      </p>
    </div>
  );
};
