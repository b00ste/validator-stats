import { WithdrawalAddressesGroup } from '../../Types/UsedDataTypes';

interface Props {
  selectedGroup: WithdrawalAddressesGroup;
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup>
  >;
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
}

const SelectGroup: React.FC<Props> = ({
  selectedGroup,
  setSelectedGroup,
  withdrawalAddressesGroups,
}) => {
  return (
    <div className="m-4 sm:col-span-2 md:col-span-3">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Select Validators Group
          </h2>
          <div className="flex items-center justify-center flex-wrap">
            {withdrawalAddressesGroups.map((group) => (
              <lukso-button
                key={group.key}
                variant={
                  selectedGroup.name === group.name ? 'primary' : 'landing'
                }
                onClick={() => setSelectedGroup(group)}
                custom-class="m-2"
              >
                {group.name}
              </lukso-button>
            ))}
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default SelectGroup;
