import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import PrivateRoutes from 'components/Auth/PrivateRoutes';
import Dashboard from 'components/Structure/Dashboard';
import TourScreen from 'components/Structure/TourScreen';
import { QueryParamProvider } from 'use-query-params';
import { GlobalDataProvider } from 'components/Contexts';

function App() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <GlobalDataProvider>
          <Routes>
            <Route path="/login" element={<div>login</div>} />
            <Route path="/" element={<PrivateRoutes />}>
              <Route path="home" element={<div>home</div>} />
              <Route path="dashboard">
                <Route path="" element={<Dashboard />} />
                <Route path=":tourId" element={<TourScreen />} />
              </Route>
              <Route path="settings" element={<div>settings</div>} />
            </Route>
          </Routes>
        </GlobalDataProvider>
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
