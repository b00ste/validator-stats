import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarWithDropdown = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const buttonClasses =
    "bg-strong-pink text-white px-3 py-1.5 m-2 rounded-lg hover:bg-dark-pink col-span-1";

  return (
    <>
      <button
        className="bg-strong-pink text-white px-3 py-1.5 rounded-lg hover:bg-dark-pink max-h-10"
        onClick={toggleDropdown}
      >
        Menu
      </button>
      {isDropdownOpen ? (
        <div className="grid flex-col -mt-2 bg-white p-4 pb-8 rounded-lg shadow-lg">
          <button className={buttonClasses} onClick={() => navigate("/")}>
            stats
          </button>
          <button
            className={buttonClasses}
            onClick={() => navigate("/validators")}
          >
            validators
          </button>
          <button className={buttonClasses} onClick={() => navigate("/user")}>
            user
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavbarWithDropdown;
