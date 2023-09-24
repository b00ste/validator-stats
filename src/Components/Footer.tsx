import { useNavigate } from "react-router-dom";
import { FooterParams } from "../Types/ComponentParamsTypes";

const Footer = ({ handlePageNavigation }: FooterParams) => {
  const navigate = useNavigate();

  return (
    <footer className="absolute bottom-0 left-4 right-4 rounded-t-3xl bg-pastel-white-pink p-2 text-center shadow">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-2.5">
          <li>
            <a
              href="https://github.com/b00ste"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              Author
            </a>
          </li>
          <li>
            <button
              onClick={() => handlePageNavigation(navigate, "/terms")}
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              Terms and Conditions
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageNavigation(navigate, "/privacy")}
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePageNavigation(navigate, "/license")}
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              License
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
