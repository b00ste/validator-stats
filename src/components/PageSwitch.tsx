import user from "../assets/user.png";
import stats from "../assets/stats.png";
import list from "../assets/list.png";

export const PageSwitch = ({ setPage }: { setPage: Function }) => {
  return (
    <div className="grid grid-cols-1 bg-slate-100 rounded-2xl shadow-md p-2 m-2 bg-opacity-40 absolute top-1 left-1 right-1">
      <div className="flex content-center justify-evenly">
        <img
          src={stats}
          alt="stats"
          className="w-12 h-12 m-2 cursor-pointer"
          onClick={() => setPage("stats")}
        />
        <img
          src={user}
          alt="user"
          className="w-12 h-12 m-2 cursor-pointer"
          onClick={() => setPage("user")}
        />
        <img
          src={list}
          alt="list"
          className="w-12 h-12 m-2 cursor-pointer"
          onClick={() => setPage("list")}
        />
      </div>
    </div>
  );
};
