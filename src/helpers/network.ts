// constants
import { consensys_explorer } from "./constants";

//types
import { PublicKey } from "../Types/UsedDataTypes";
import { Epoch } from "../Types/FetchedDataTypes";

export const getLastEpoch = async () => {
  let lastEpoch = {} as Epoch;
  try {
    await fetch(`${consensys_explorer}/api/v1/epoch/latest`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
      .then((res) => res.json())
      .then(({ data }) => (lastEpoch = data));
  } catch (error) {
    console.log(error);
  }

  return lastEpoch;
};

export const getWithdrawalAddressesBalance = async (
  publicKeys: PublicKey[]
) => {
  let balance = 0;
  for (let i = 0; i < publicKeys.length; i++) {
    const publicKey = publicKeys[i];

    let retrievedBalance = "";
    const tracker = {} as Record<string, boolean>;
    if (publicKey.type === "withdrawal") {
      try {
        await fetch(
          `${consensys_explorer}/api/v1/execution/address/${publicKey.address}`,
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        )
          .then((res) => res.json())
          .then(
            ({
              data: { ether, address },
            }: {
              data: { ether: string; address: string };
            }) => {
              if (!tracker[address]) {
                retrievedBalance = ether;
                tracker[address] = true;
              }
            }
          );
      } catch (error) {
        console.log(error);
      }

      balance += Number.parseFloat(retrievedBalance);
    }
  }

  return balance;
};

export const getLYXPrice = async () => {
  let eurPrice = "";
  let usdPrice = "";

  try {
    await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=lukso-token-2&vs_currencies=eur%2Cusd",
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        eurPrice = data["lukso-token-2"].eur;
        usdPrice = data["lukso-token-2"].usd;
      });
  } catch (error) {
    console.log(error);
  }

  return {
    eurPrice,
    usdPrice,
  };
};
