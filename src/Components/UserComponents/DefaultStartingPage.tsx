interface Props {
  setShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
  setNotificationHeader: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  defaultPage: string;
  setDefaultPage: React.Dispatch<
    React.SetStateAction<
      '/home' | '/validatorStatistics' | '/validatorList' | '/user'
    >
  >;
}

const DefaultStartingPage: React.FC<Props> = ({
  setShowNotification,
  setNotificationHeader,
  defaultPage,
  setDefaultPage,
}) => {
  const handleDefaultPageChange = (
    pageName: '/home' | '/validatorStatistics' | '/validatorList' | '/user',
  ) => {
    if (pageName !== defaultPage) {
      setDefaultPage(pageName);
    }
  };

  const handleDefaultPageSelect = (event: React.MouseEvent) => {
    event.preventDefault();

    setShowNotification(true);
    setNotificationHeader('Default page updated!');

    localStorage.setItem('defaultPage', defaultPage);

    setTimeout(() => {
      setShowNotification(false);
      setNotificationHeader(undefined);
    }, 1500);
  };

  return (
    <div className="m-4">
      <lukso-card variant="basic" size="medium">
        <div
          slot="content"
          className="p-6 flex flex-col items-center justify-center"
        >
          <h2 className="heading-inter-21-semi-bold mb-4 text-center text-purple-31">
            Default starting page
          </h2>
          <div className="pb-4">
            <div className="mb-2">
              {'/home' === defaultPage ? (
                <lukso-checkbox
                  checked
                  size="small"
                  onClick={() => handleDefaultPageChange('/home')}
                >
                  Home
                </lukso-checkbox>
              ) : (
                <lukso-checkbox
                  size="small"
                  onClick={() => handleDefaultPageChange('/home')}
                >
                  Home
                </lukso-checkbox>
              )}
            </div>

            <div className="mb-2">
              {'/validatorStatistics' === defaultPage ? (
                <lukso-checkbox
                  checked
                  size="small"
                  onClick={() =>
                    handleDefaultPageChange('/validatorStatistics')
                  }
                >
                  Validator Statistics
                </lukso-checkbox>
              ) : (
                <lukso-checkbox
                  size="small"
                  onClick={() =>
                    handleDefaultPageChange('/validatorStatistics')
                  }
                >
                  Validator Statistics
                </lukso-checkbox>
              )}
            </div>

            <div className="mb-2">
              {'/validatorList' === defaultPage ? (
                <lukso-checkbox
                  checked
                  size="small"
                  onClick={() => handleDefaultPageChange('/validatorList')}
                >
                  Validator List
                </lukso-checkbox>
              ) : (
                <lukso-checkbox
                  size="small"
                  onClick={() => handleDefaultPageChange('/validatorList')}
                >
                  Validator List
                </lukso-checkbox>
              )}
            </div>

            <div className="mb-2">
              {'/user' === defaultPage ? (
                <lukso-checkbox
                  checked
                  size="small"
                  onClick={() => handleDefaultPageChange('/user')}
                >
                  User Settings
                </lukso-checkbox>
              ) : (
                <lukso-checkbox
                  size="small"
                  onClick={() => handleDefaultPageChange('/user')}
                >
                  User Settings
                </lukso-checkbox>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <lukso-button
              variant="landing"
              onClick={(event) => handleDefaultPageSelect(event)}
            >
              Select
            </lukso-button>
          </div>
        </div>
      </lukso-card>
    </div>
  );
};

export default DefaultStartingPage;
