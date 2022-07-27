import { useContext } from 'react';

import { AlertContext } from 'components/Contexts';

const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;
