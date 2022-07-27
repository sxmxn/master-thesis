import { useContext } from 'react';

import { CustomerDataContext } from 'components/Contexts';

const useCustomerData = () => {
  return useContext(CustomerDataContext);
};

export default useCustomerData;
