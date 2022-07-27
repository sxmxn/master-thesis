import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import PrivateRoutes from 'components/Auth/PrivateRoutes';
import DashboardScreen from 'components/Screens/DashboardScreen';
import TourScreen from 'components/Screens/TourScreen';
import BoxTemperatureScreen from 'components/Screens/BoxTemperatureScreen';
import BoxVibrationScreen from 'components/Screens/BoxVibrationScreen';
import ParameterDetailsScreen from 'components/Screens/ParameterDetailsScreen';
import DefaultScreen from 'components/Screens/DefaultScreen';
import { QueryParamProvider } from 'use-query-params';
import { CustomerDataProvider, AlertProvider } from 'components/Contexts';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <CustomerDataProvider>
          <AlertProvider>
            <Routes>
              <Route path="/login" element={<div>login</div>} />
              <Route path="/" element={<PrivateRoutes />}>
                <Route
                  path="home"
                  element={<DefaultScreen title="Home Screen" />}
                />
                <Route path="dashboard">
                  <Route path="" element={<DashboardScreen />} />
                  <Route path=":tourId">
                    <Route path="" element={<TourScreen />} />
                    <Route path="temperature">
                      <Route
                        path=""
                        element={<ParameterDetailsScreen type="TEMPERATURE" />}
                      />
                      <Route
                        path="box/:boxId"
                        element={<BoxTemperatureScreen />}
                      />
                    </Route>
                    <Route path="vibration">
                      <Route
                        path=""
                        element={<ParameterDetailsScreen type="VIBRATION" />}
                      />
                      <Route
                        path="box/:boxId"
                        element={<BoxVibrationScreen />}
                      />
                    </Route>
                  </Route>
                </Route>
                <Route
                  path="settings"
                  element={<DefaultScreen title="Settings" />}
                />
              </Route>
            </Routes>
          </AlertProvider>
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
