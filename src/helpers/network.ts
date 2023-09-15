import { Epoch, PublicKey } from "../typings/types";
import { consensys_explorer } from "./constants";

export const getLastEpoch = async () => {
  let lastEpoch = {} as Epoch;
  await fetch(`${consensys_explorer}/api/v1/epoch/latest`)
    .then((res) => res.json())
    .then(({ data }) => (lastEpoch = data));

  return lastEpoch;
};

export const getWithdrawalAddressBalance = async (publicKeys: PublicKey[]) => {
  let balance = 0;
  for (let i = 0; i < publicKeys.length; i++) {
    const publicKey = publicKeys[i];

    let retrievedBalance = "";
    const tracker = {} as Record<string, boolean>;
    if (publicKey.type === "withdrawal") {
      await fetch(
        `${consensys_explorer}/api/v1/execution/address/${publicKey.address}`
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

      balance += Number.parseFloat(retrievedBalance);
    }
  }

  return balance;
};
