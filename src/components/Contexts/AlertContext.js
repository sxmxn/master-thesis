import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useQuery } from 'react-query';
import { getAlert } from 'queries';
import styled from 'styled-components';
import Slide from '@mui/material/Slide';

const StyledAlert = styled(Alert)`
  background-color: ${({ theme }) => theme.palette.warning.main} !important;
  color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px !important;

  &.MuiAlert-root {
    svg {
      color: #fff !important;
    }
  }
`;

const AlertContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [sawAlert, setSawAlert] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const { data } = useQuery('alert', getAlert, {
    // refetch every 6 seconds
    refetchInterval: 6000,
  });

  useEffect(() => {
    if (!!data) {
      if (data.alert) setOpenAlert(true);
      setSawAlert(false);
    }
  }, [data]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSawAlert(true);
  };

  return (
    <AlertContext.Provider value={{}}>
      <Snackbar
        open={openAlert && !sawAlert}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <StyledAlert onClose={handleClose} severity="error">
          {data?.message}
        </StyledAlert>
      </Snackbar>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.any,
};

export { AlertProvider };

export default AlertContext;
