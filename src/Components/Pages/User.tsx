import { FormEvent, useEffect, useRef, useState } from "react";
import { consensys_explorer } from "../../Helpers/constants";
import { UserPageParams } from "../../Types/ComponentParamsTypes";

const User = ({
  bodyClasses,
  publicKeys,
  setPublicKeys,
  validators,
  setValidators,
  defaultPage,
  setDefaultPage,
}: UserPageParams) => {
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("publicKeys", JSON.stringify(publicKeys));
  }, [publicKeys]);

  const addressRef = useRef<any>();
  const nameRef = useRef<any>();
  const typeRef = useRef<any>();

  const handleAddressSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (nameRef.current.value.length === 0) {
      setError("Please set a name");
      return;
    }

    if (
      !addressRef.current.value.startsWith("0x") ||
      addressRef.current.value.length !== 42
    ) {
      setError("Please set a valid address");
      return;
    }

    if (
      typeRef.current.value !== "depositor" &&
      typeRef.current.value !== "withdrawal"
    ) {
      setError("Please select the type of the address");
      return;
    }

    setPublicKeys([
      ...publicKeys,
      {
        address: addressRef.current.value,
        type: typeRef.current.value,
        name: nameRef.current.value,
      },
    ]);

    addressRef.current.value = "";
    typeRef.current.value = "";
    nameRef.current.value = "";
    setError("");
  };

  const handleNameEdit = (addressToEdit: string, event: FormEvent) => {
    event.preventDefault();

    if (nameRef.current.value.length === 0) {
      setError("Please set a name");
      return;
    }

    setPublicKeys(() =>
      publicKeys.map((publicKey) => {
        if (publicKey.address === addressToEdit)
          return { ...publicKey, name: nameRef.current.value };
        return publicKey;
      })
    );

    nameRef.current.value = "";
    setError("");
  };

  const handleAddressDelete = (addressToDelete: string) => {
    setPublicKeys(() =>
      publicKeys.filter((publicKey) => publicKey.address !== addressToDelete)
    );
    setValidators({ ...validators, [addressToDelete]: [] });
  };

  const handleDefaultPageChange = (
    pageName: "/home" | "/validatorStatistics" | "/validatorList" | "user"
  ) => {
    setDefaultPage(pageName === defaultPage ? "" : pageName);
  };

  const handleDefaultPageSelect = (event: React.MouseEvent) => {
    event.preventDefault();

    localStorage.setItem("defaultPage", defaultPage);
  };

  /// ------ Styling Handling ------
  const tableHeadStyle = "text-gray-700 px-4 py-1";
  /// ------------------------------

  return (
    <div className={`${bodyClasses} sm:grid-cols-3 lg:grid-cols-4`}>
      {/* <!-- Tile 1: Add Address Form --> */}
      <div className="bg-pastel-light-pink p-4 rounded-lg shadow text-center flex flex-col items-center">
        <h2 className="text-pastel-blue text-2xl mb-4">Add Ethereum Address</h2>
        <form className="w-full max-w-md">
          <div className="mb-4">
            <label
              htmlFor="ethAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Ethereum Address:
            </label>
            <input
              type="text"
              id="ethAddress"
              name="ethAddress"
              placeholder="address"
              className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-pastel-blue text-center"
              ref={addressRef}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name"
              className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-pastel-blue text-center"
              ref={nameRef}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="addressType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Type:
            </label>
            <select
              id="addressType"
              name="addressType"
              className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring focus:border-pastel-blue text-center"
              defaultValue="withdrawal"
              ref={typeRef}
            >
              <option value="depositor">Depositor</option>
              <option value="withdrawal">Withdrawal</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-strong-pink text-white px-4 py-2 rounded-lg hover:bg-dark-pink w-full"
            onClick={(event) => handleAddressSubmit(event)}
          >
            Add Address
          </button>
        </form>
        {error ? <p className="text-pastel-red font-bold">{error}</p> : ""}
      </div>

      {/* <!-- Tile 2: List of Saved Addresses --> */}
      <div className="bg-pastel-light-pink p-4 rounded-lg shadow col-span-1 sm:col-span-2 lg:col-span-3">
        <h2 className="text-pastel-blue text-2xl mb-4">Saved Addresses</h2>
        <div className="overflow-x-scroll">
          <table className="table-auto break-words w-full text-center">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className={tableHeadStyle}>Address</th>
                <th className={tableHeadStyle}>Name</th>
                <th className={tableHeadStyle}>Type</th>
                <th className={tableHeadStyle}>Consensus</th>
                <th className={tableHeadStyle}>Edit</th>
                <th className={tableHeadStyle}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {publicKeys.map((publicKey) => (
                <tr key={publicKey.address}>
                  <td className="px-4 py-1">
                    <a
                      href={`${consensys_explorer}/address/${publicKey.address.substring(
                        2
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pastel-blue hover:underline"
                    >
                      {`${publicKey.address.substring(
                        0,
                        4
                      )}...${publicKey.address.substring(
                        publicKey.address.length - 2,
                        publicKey.address.length
                      )}`}
                    </a>
                  </td>
                  <td className="px-4 py-1 text-gray-700">{publicKey.name}</td>
                  <td className="px-4 py-1 text-gray-700">{publicKey.type}</td>
                  <td className="px-4 py-1">
                    <a
                      href={`${consensys_explorer}/dashboard?validators=${validators[
                        publicKey.address
                      ].toString()}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pastel-blue hover:underline"
                    >
                      Dashboard
                    </a>
                  </td>
                  <td className="px-4 py-1">
                    <button
                      className="text-pastel-green hover:text-green-500"
                      onClick={(event) =>
                        handleNameEdit(publicKey.address, event)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-4 py-1">
                    <button
                      className="text-pastel-red hover:text-red-600"
                      onClick={() => handleAddressDelete(publicKey.address)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <!-- Tile 3: Set default starting page --> */}
      <div className="bg-pastel-light-pink p-4 rounded-lg shadow col-span-1">
        <h2 className="text-pastel-blue text-2xl mb-4">
          Default starting page
        </h2>
        <form className="w-full max-w-md">
          <div>
            <input
              type="checkbox"
              id="/home"
              checked={"/home" === defaultPage}
              onChange={() => handleDefaultPageChange("/home")}
            />
            <label className="ml-4" htmlFor="/home">
              Home
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="/validatorStatistics"
              checked={"/validatorStatistics" === defaultPage}
              onChange={() => handleDefaultPageChange("/validatorStatistics")}
            />
            <label className="ml-4" htmlFor="/validatorStatistics">
              Validator Statistics
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="/validatorList"
              checked={"/validatorList" === defaultPage}
              onChange={() => handleDefaultPageChange("/validatorList")}
            />
            <label className="ml-4" htmlFor="/validatorList">
              Validator List
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="user"
              checked={"user" === defaultPage}
              onChange={() => handleDefaultPageChange("user")}
            />
            <label className="ml-4" htmlFor="user">
              User
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className="mt-4 py-1 px-2 rounded-md bg-strong-pink hover:bg-dark-pink"
              onClick={(event) => handleDefaultPageSelect(event)}
            >
              Select
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default User;
