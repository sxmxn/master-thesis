import React from 'react';
import PageContainer from 'components/PageContainer';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

//Todo add authentication
const IS_AUTHENTICATED = true;

const PrivateRoutes = () => {
  const { pathname } = useLocation();

  if (IS_AUTHENTICATED && pathname === '/') {
    return <Navigate to={'/dashboard'} />;
  }

  return IS_AUTHENTICATED ? (
    <PageContainer>
      <Outlet />
    </PageContainer>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default PrivateRoutes;
