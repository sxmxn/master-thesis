import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from 'components/Auth/PrivateRoutes';
import Dashboard from 'components/Structure/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<div>login</div>} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="home" element={<div>home</div>} />
          <Route path="dashboard">
            <Route path="" element={<Dashboard />} />
            <Route path=":tourId" element={<div>tourId</div>} />
          </Route>
          <Route path="settings" element={<div>settings</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
