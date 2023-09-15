export const Footer = ({ setPage }: { setPage: Function }) => {
  return (
    <footer className="fixed bottom-0 left-4 right-4 rounded-t-3xl bg-pastel-white-pink p-2 text-center shadow">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4">
          <li>
            <a
              href="https://github.com/b00ste"
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-pastel-blue"
            >
              Author
            </a>
          </li>
          <li>
            <button
              className="text-gray-600 hover:text-pastel-blue"
              onClick={() => setPage("terms")}
            >
              Terms and Conditions
            </button>
          </li>
          <li>
            <button
              className="text-gray-600 hover:text-pastel-blue"
              onClick={() => setPage("privacy")}
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              className="text-gray-600 hover:text-pastel-blue"
              onClick={() => setPage("license")}
            >
              License
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};
