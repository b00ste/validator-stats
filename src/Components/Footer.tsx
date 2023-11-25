import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="mt-20">
      <footer className="w-full mb-0 mx-0 p-4 flex flex-row flex-wrap justify-center items-center bg-white">
        <a
          href="https://github.com/b00ste"
          target="_blank"
          rel="noreferrer"
          className="m-4 paragraph-inter-12-medium text-purple-41 hover:underline underline-offset-2"
        >
          Author
        </a>
        <Link
          to="/terms"
          className="m-4 paragraph-inter-12-medium text-purple-41 hover:underline underline-offset-2"
        >
          Terms and Conditions
        </Link>
        <Link
          to="/privacy"
          className="m-4 paragraph-inter-12-medium text-purple-41 hover:underline underline-offset-2"
        >
          Privacy Policy
        </Link>
        <Link
          to="/license"
          className="m-4 paragraph-inter-12-medium text-purple-41 hover:underline underline-offset-2"
        >
          License
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
