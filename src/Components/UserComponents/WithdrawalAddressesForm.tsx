import { FormEvent, useState } from 'react';
import { WithdrawalAddress } from '../../Types/UsedDataTypes';

interface Props {
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationHeader: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  withdrawalAddresses: WithdrawalAddress[];
  setWithdrawalAddresses: React.Dispatch<
    React.SetStateAction<WithdrawalAddress[]>
  >;
}

const WithdrawalAddressesForm: React.FC<Props> = ({
  setError,
  setShowNotification,
  setNotificationHeader,
  withdrawalAddresses,
  setWithdrawalAddresses,
}) => {
  const [address, setAddress] = useState<string>();
  const onAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setAddress(userInput);
  };

  const [addressName, setAddressName] = useState<string>();
  const onAddressNameInput = (event: React.FormEvent<HTMLInputElement>) => {
    const userInput = event.currentTarget.value;
    setAddressName(userInput);
  };

  const handleAddressSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!address || !address.startsWith('0x') || address.length !== 42) {
      setError('Please set a valid address');
      return;
    }

    if (!addressName) {
      setError('Please set a name');
      return;
    }

    if (withdrawalAddresses.map(({ address }) => address).includes(address)) {
      setError('Addres already exists');
      return;
    }

    setShowNotification(true);
    setNotificationHeader('New address added!');

    setWithdrawalAddresses([
      ...withdrawalAddresses,
      {
        address: address,
        name: addressName,
      },
    ]);

    setError(undefined);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationHeader(undefined);
    }, 1500);
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Add Withdrawal Address
          </h2>
          <div className="mb-4">
            <p className="heading-inter-17-semi-bold mb-2">
              Withdrawal Address:
            </p>
            <lukso-input
              placeholder="Address"
              onInput={(event) =>
                onAddressInput(event as unknown as FormEvent<HTMLInputElement>)
              }
            />
          </div>
          <div className="mb-4">
            <p className="heading-inter-17-semi-bold mb-2">Name:</p>
            <lukso-input
              placeholder="Name"
              onInput={(event) =>
                onAddressNameInput(
                  event as unknown as FormEvent<HTMLInputElement>,
                )
              }
            />
          </div>
          <lukso-button
            variant="landing"
            onClick={(event) => handleAddressSubmit(event)}
          >
            Add Address
          </lukso-button>
        </div>
      </lukso-card>
    </div>
  );
};

export default WithdrawalAddressesForm;
