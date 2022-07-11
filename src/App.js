import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import PrivateRoutes from 'components/Auth/PrivateRoutes';
import HomeScreen from 'components/Screens/HomeScreen';
import TourScreen from 'components/Screens/TourScreen';
import ParameterDetailsScreen from 'components/Screens/ParameterDetailsScreen';
import { QueryParamProvider } from 'use-query-params';
import { CustomerDataProvider } from 'components/Contexts';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <CustomerDataProvider>
          <Routes>
            <Route path="/login" element={<div>login</div>} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="home" element={<div>home</div>} />
              <Route path="dashboard">
                <Route path="" element={<HomeScreen />} />
                <Route path=":tourId">
                  <Route path="" element={<TourScreen />} />
                  <Route
                    path="temperature"
                    element={<ParameterDetailsScreen type="TEMPERATURE" />}
                  />
                  <Route
                    path="vibration"
                    element={<ParameterDetailsScreen type="VIBRATION" />}
                  />
                </Route>
              </Route>
              <Route path="settings" element={<div>settings</div>} />
            </Route>
          </Routes>
        </CustomerDataProvider>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

// to get the QueryParamProvider working with react router 6 you need a route adapter
const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

export default App;
