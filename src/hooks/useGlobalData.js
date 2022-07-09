import { useContext } from 'react';

import { CustomerDataContext } from 'components/Contexts';

const useGlobalData = () => {
  return useContext(CustomerDataContext);
};

export default useGlobalData;
