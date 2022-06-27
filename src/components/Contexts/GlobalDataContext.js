import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const GlobalDataContext = createContext(null);

const GlobalDataProvider = ({ children }) => {
  const [customer, setCustomer] = useState('');

  return (
    <GlobalDataContext.Provider value={{ setCustomer, customer }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

GlobalDataProvider.propTypes = {
  children: PropTypes.any,
};

export { GlobalDataProvider };

export default GlobalDataContext;
