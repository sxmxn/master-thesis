import { useContext } from 'react';

import { GlobalDataContext } from 'components/Contexts';

const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export default useGlobalData;
