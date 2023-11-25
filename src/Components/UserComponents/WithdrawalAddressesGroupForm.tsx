import {
  FormEvent,
  LegacyRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  WithdrawalAddress,
  WithdrawalAddressesGroup,
} from '../../Types/UsedDataTypes';
import { generateUUID } from '../../Helpers/utils';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationHeader: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  withdrawalAddresses: WithdrawalAddress[];
  withdrawalAddressesGroups: WithdrawalAddressesGroup[];
  setWithdrawalAddressessGroups: React.Dispatch<
    React.SetStateAction<WithdrawalAddressesGroup[]>
  >;
}

const WithdrawalAddressesGroupForm: React.FC<Props> = ({
  setError,
  setShowNotification,
  setNotificationHeader,
  withdrawalAddresses,
  withdrawalAddressesGroups,
  setWithdrawalAddressessGroups,
}) => {
  const [newGroup, setNewGroup] = useState<WithdrawalAddress[]>([]);

  const withdrawalAddressesOptions = useMemo(
    () => [
      {
        id: 0,
        value: 'choose address',
      },
      ...withdrawalAddresses.map(({ name }, index) => ({
        id: index + 1,
        value: name,
      })),
    ],
    [withdrawalAddresses],
  );

  const [groupName, setGroupName] = useState<string>();
  const onGroupNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setGroupName(userInput);
  };

  const groupElementsRef = useRef<HTMLElement>();

  const handleAddressRemovalFromNewGroup = (
    elemToRemove: WithdrawalAddress,
  ) => {
    if (newGroup.includes(elemToRemove)) {
      const updatedGroup = newGroup.filter(
        (elem) => elem.address !== elemToRemove.address,
      );

      setNewGroup(updatedGroup);
    }
  };

  const handleCreateGroupSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!groupName) {
      setError('Please set a group name.');
      return;
    }

    if (newGroup.length === 0) {
      setError('Please choose addresses for the new group.');
      return;
    }

    setShowNotification(true);
    setNotificationHeader('New group created!');

    const newWithdrawalAddressesGroup = [
      ...withdrawalAddressesGroups,
      {
        name: groupName,
        withdrawalAddresses: newGroup,
        key: generateUUID(),
      },
    ];
    setWithdrawalAddressessGroups(newWithdrawalAddressesGroup);

    setNewGroup([]);
    setGroupName(undefined);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationHeader(undefined);
    }, 1500);
  };

  // `lukso-select` token standard update
  useEffect(() => {
    const meth = ({
      detail: { value: _value = withdrawalAddressesOptions[0] } = {},
    }) => {
      const { value } = _value;
      if (value !== 'choose address') {
        if (!newGroup.map(({ name }) => name).includes(value)) {
          const updatedGroup = [
            ...newGroup,
            withdrawalAddresses.filter((elem) => value === elem.name)[0],
          ];

          setNewGroup(updatedGroup);
        }
      }
    };
    const select = groupElementsRef.current as any;
    select?.addEventListener('on-select', meth);
    return () => {
      select?.removeEventListener('on-select', meth);
    };
  }, [withdrawalAddressesOptions, withdrawalAddresses, newGroup]);

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Create Groups of Withdrawal Addresses
          </h2>
          <div className="mb-4">
            <p className="heading-inter-17-semi-bold mb-2">Group name:</p>
            <lukso-input
              placeholder="Group name"
              value={groupName}
              onInput={(event) =>
                onGroupNameInput(
                  event as unknown as FormEvent<HTMLInputElement>,
                )
              }
            />
          </div>
          <div className="mb-4">
            {newGroup.map((elem) => (
              <div className="m-1" key={elem.address}>
                <lukso-tag size="large" background-color="purple-82">
                  {elem.name}
                  <span
                    className="ml-2 font-extrabold hover:cursor-pointer hover:opacity-70"
                    onClick={() => handleAddressRemovalFromNewGroup(elem)}
                  >
                    X
                  </span>
                </lukso-tag>
              </div>
            ))}
          </div>
          <div className="mb-4 flex flex-col items-center">
            <p className="heading-inter-17-semi-bold mb-4">
              {newGroup.length === 0
                ? 'Add a withdrawal address to the group'
                : 'Add another withdrawal address to the group'}
            </p>
            <lukso-select
              ref={groupElementsRef as unknown as LegacyRef<HTMLElement>}
              value={JSON.stringify(withdrawalAddressesOptions[0])}
              options={JSON.stringify(
                withdrawalAddressesOptions.filter(
                  ({ value }) =>
                    !newGroup.map(({ name }) => name).includes(value),
                ),
              )}
            />
          </div>
          <lukso-button
            variant="landing"
            onClick={(event) => handleCreateGroupSubmit(event)}
          >
            Create Group
          </lukso-button>
        </div>
      </lukso-card>
    </div>
  );
};

export default WithdrawalAddressesGroupForm;
