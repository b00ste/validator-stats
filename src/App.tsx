import { useState } from "react";
import { UserPage } from "./components/UserPage";
import { StatsPage } from "./components/StatsPage";

import user from "./assets/user.png";
import stats from "./assets/stats.png";

function App() {
  const storedPublicKeys = localStorage.getItem("publicKeys");

  // Depositoor address or withdrawal address
  const [publicKeys, setPublicKeys] = useState(
    storedPublicKeys ? JSON.parse(storedPublicKeys) : []
  );

  const [lastPage, setLastPage] = useState("stats");

  const currentPageHandler = () => {
    if (lastPage === "stats") {
      setLastPage("user");
    }
    if (lastPage === "user") {
      setLastPage("stats");
    }
  };

  return (
    <div className="flex items-center min-h-screen bg-pink-300 dark:bg-pink-500">
      {lastPage === "stats" ? (
        <StatsPage />
      ) : lastPage === "user" ? (
        <UserPage publicKeys={publicKeys} setPublicKeys={setPublicKeys} />
      ) : (
        <></>
      )}

      <img
        className="absolute top-2 right-2 w-16 h-16"
        src={lastPage === "stats" ? user : lastPage === "user" ? stats : ""}
        onClick={() => {
          currentPageHandler();
        }}
        alt={lastPage}
      />
    </div>
  );
}

export default App;
