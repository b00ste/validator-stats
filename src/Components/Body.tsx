import { Navigate, Route, Routes } from 'react-router-dom';

// Pages
import Landing from './Pages/Landing';
import ValidatorStats from './Pages/ValidatorStats';
import Validators from './Pages/Validators';
import User from './Pages/User';
import TermsAndConditions from './Pages/TermsAndConditions';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import License from './Pages/License';
import PageNotFound from './Pages/PageNotFound';

// Types
import { BodyParams } from '../Types/ComponentParamsTypes';

const Body = ({
  defaultPage,
  setDefaultPage,
  handlePageNavigation,
  withdrawalAddresses,
  setWithdrawalAddresses,
  withdrawalAddressesGroups,
  setWithdrawalAddressessGroups,
  withdrawalAddressesBalances,
  validators,
  setValidators,
  validatorsData,
  networkData,
  tokenPrice,
}: BodyParams) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={defaultPage ? defaultPage : '/home'} replace />}
      />
      <Route
        path="/home"
        element={<Landing handlePageNavigation={handlePageNavigation} />}
      />
      <Route
        path="/validatorStatistics"
        element={
          <ValidatorStats
            stakedLYX={networkData.stakedLYX ? networkData.stakedLYX : 0}
            tokenPrice={tokenPrice}
            validatorsData={validatorsData}
            withdrawalAddressesGroups={withdrawalAddressesGroups}
            withdrawalAddressesBalance={
              withdrawalAddressesBalances ? withdrawalAddressesBalances : {}
            }
          />
        }
      />
      <Route
        path="/user"
        element={
          <User
            defaultPage={defaultPage}
            setDefaultPage={setDefaultPage}
            withdrawalAddresses={withdrawalAddresses}
            setWithdrawalAddresses={setWithdrawalAddresses}
            validators={validators}
            setValidators={setValidators}
            withdrawalAddressesGroups={withdrawalAddressesGroups}
            setWithdrawalAddressessGroups={setWithdrawalAddressessGroups}
          />
        }
      />
      <Route
        path="/validatorList"
        element={
          <Validators
            withdrawalAddresses={withdrawalAddresses}
            validatorsMaps={validatorsData.validatorsMaps}
            validatorsPerformance={
              validatorsData.validatorsPerformance
                ? validatorsData.validatorsPerformance
                : {}
            }
          />
        }
      />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/license" element={<License />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Body;
