import { FormEvent, useEffect, useRef } from "react";

export const UserPage = ({
  publicKeys,
  setPublicKeys,
}: {
  publicKeys: { address: string; type: string }[];
  setPublicKeys: Function;
}) => {
  useEffect(() => {
    localStorage.setItem("publicKeys", JSON.stringify(publicKeys));
  }, [publicKeys]);

  const addressRef = useRef<any>();

  const handleDepositoorSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (addressRef.current) {
      if (
        addressRef.current.value.startsWith("0x") &&
        (addressRef.current.value.length === 66 ||
          addressRef.current.value.length === 42)
      )
        setPublicKeys([
          ...publicKeys,
          { address: addressRef.current.value, type: "depositoor" },
        ]);
      addressRef.current.value = "";
    }
  };

  const handleWithdrawalAddressSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    if (addressRef.current) {
      if (
        addressRef.current.value.startsWith("0x") &&
        (addressRef.current.value.length === 66 ||
          addressRef.current.value.length === 42)
      )
        setPublicKeys([
          ...publicKeys,
          { address: addressRef.current.value, type: "withdrawal_address" },
        ]);
      addressRef.current.value = "";
    }
  };

  const handleAddressDelete = (addressToDelete: string) => {
    setPublicKeys(() =>
      publicKeys.filter((publicKey) => publicKey.address !== addressToDelete)
    );
  };

  return (
    <div className="grid flex-col content-center justify-center w-full">
      <form className="w-auto m-2 flex flex-col content-center justify-center bg-slate-100 rounded-2xl shadow-md bg-opacity-40">
        <div className="container flex content-center justify-center">
          <input
            className="rounded-md p-2 m-2 text-center w-2/3"
            type="text"
            placeholder="address"
            ref={addressRef}
          />
        </div>
        <div className="container flex content-center justify-center">
          <button
            className="rounded-md bg-slate-200 p-2 m-2 w-1/3"
            onClick={(evt) => {
              handleDepositoorSubmit(evt);
            }}
          >
            add depositoor
          </button>
          <button
            className="rounded-md bg-slate-200 p-2 m-2 w-1/3"
            onClick={(evt) => {
              handleWithdrawalAddressSubmit(evt);
            }}
          >
            add withdrawal address
          </button>
        </div>
      </form>
      <div className="w-auto m-2 flex flex-col content-center justify-center bg-slate-100 rounded-2xl shadow-md bg-opacity-60 p-4">
        {publicKeys.length > 0 &&
          publicKeys.map((publicKey) => (
            <div className="flex flex-row" key={publicKey.address}>
              <code className="m-1 p-1 bg-white bg-opacity-30 rounded-xl">{`${publicKey.address}`}</code>
              <p className="m-1">{` - ${publicKey.type}`}</p>
              <button
                className="w-6 h-6 m-2 rounded-sm bg-slate-400 shadow-2xl"
                onClick={(evt) => {
                  handleAddressDelete(publicKey.address);
                }}
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
