type HeaderParams = {
  setPage: Function;
  stakedLYX: number;
  currentEpoch: number;
  networkValidators: number;
};

export const Header = ({
  setPage,
  stakedLYX,
  currentEpoch,
  networkValidators,
}: HeaderParams) => {
  const tileClasses =
    "mb-2 text-center flex flex-col items-center justify-center overflow-clip overflow-ellipsis";

  return (
    <nav className="fixed top-0 left-4 right-4">
      <div className="container mx-auto grid grid-cols-3 bg-pastel-white-pink p-4 rounded-b-3xl shadow">
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Validators</div>
          <p className="text-gray-600">{networkValidators.toLocaleString()}</p>
        </div>
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Staked LYX</div>
          <p className="text-gray-600">
            {Math.round(stakedLYX / 1e9).toLocaleString()}
          </p>
        </div>
        <div className={`${tileClasses}`}>
          <div className="text-pastel-blue text-xl mb-2">Epoch</div>
          <p className="text-gray-600">{currentEpoch.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-strong-pink text-white px-4 py-2 rounded-b-lg hover:bg-dark-pink"
          onClick={() => setPage("stats")}
        >
          stats
        </button>
        <button
          className="bg-strong-pink text-white px-4 py-2 rounded-b-lg hover:bg-dark-pink"
          onClick={() => setPage("validators")}
        >
          validators
        </button>
        <button
          className="bg-strong-pink text-white px-4 py-2 rounded-b-lg hover:bg-dark-pink"
          onClick={() => setPage("user")}
        >
          user
        </button>
      </div>
    </nav>
  );
};
