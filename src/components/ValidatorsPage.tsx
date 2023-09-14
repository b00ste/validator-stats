import { PublicKey } from "../typings/types";

type ValidatorsPageParams = {
  publicKeys: PublicKey[];
  validatorArray: string[];
};

export const ValidatorsPage = ({
  publicKeys,
  validatorArray,
}: ValidatorsPageParams) => {
  return (
    <div className="container max-w-6xl px-5 mx-auto my-28">
      {validatorArray.map((validator) => {
        return (
          <div className="grid m-2 p-2 bg-slate-100 rounded-2xl shadow-md bg-opacity-40 break-all">
            {validator}
          </div>
        );
      })}
    </div>
  );
};
