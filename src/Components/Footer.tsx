import { useNavigate } from "react-router-dom";

const Footer = ({ pageChangeHandler }: { pageChangeHandler: Function }) => {
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
              onClick={() => pageChangeHandler(navigate, "/terms")}
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              Terms and Conditions
            </button>
          </li>
          <li>
            <button
              onClick={() => pageChangeHandler(navigate, "/privacy")}
              className="text-gray-600 text-xs hover:text-pastel-blue"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => pageChangeHandler(navigate, "/license")}
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
