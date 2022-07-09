import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CustomerDataContext = createContext(null);

const CustomerDataProvider = ({ children }) => {
  const [customer, setCustomer] = useState('');

  return (
    <CustomerDataContext.Provider value={{ setCustomer, customer }}>
      {children}
    </CustomerDataContext.Provider>
  );
};

CustomerDataProvider.propTypes = {
  children: PropTypes.any,
};

export { CustomerDataProvider };

export default CustomerDataContext;
