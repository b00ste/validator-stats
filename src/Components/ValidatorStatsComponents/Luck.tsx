import { useContext, useEffect, useState } from 'react';

// types
import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

// context
import { ValidatorsDataContext } from '../../App';

interface Props {
  selectedGroup: WithdrawalAddressesGroup;
}

export const Luck: React.FC<Props> = ({ selectedGroup }) => {
  const { validatorsLuck = {} } = useContext(ValidatorsDataContext);

  const [proposalLuck, setProposalLuck] = useState(0);

  useEffect(() => {
    const withdrawalAddresses = selectedGroup.withdrawalAddresses;
    if (withdrawalAddresses.length === 1) {
      setProposalLuck(
        validatorsLuck[withdrawalAddresses[0].address]
          ? validatorsLuck[withdrawalAddresses[0].address].proposal_luck
          : 0,
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
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center text-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-purple-31">
            Luck
          </h2>
          <p className="paragraph-inter-14-medium">
            {`${proposalLuck.toLocaleString()} %`}
          </p>
        </div>
      </lukso-card>
    </div>
  );
};
