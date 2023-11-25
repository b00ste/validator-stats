interface Props {
  error: string;
  setError: Function;
}

const Error: React.FC<Props> = ({ error, setError }) => {
  return (
    <lukso-modal is-open>
      <div className="p-6">
        {error}
        <p className="pt-6">
          <lukso-button
            is-full-width
            variant="landing"
            onClick={() => setError(undefined)}
          >
            Close
          </lukso-button>
        </p>
      </div>
    </lukso-modal>
  );
};

export default Error;
