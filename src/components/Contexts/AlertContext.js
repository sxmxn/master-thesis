import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useQuery } from 'react-query';
import { getAlert } from 'queries';
import styled from 'styled-components';
import Slide from '@mui/material/Slide';
import { useTranslation } from 'react-i18next';

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
  const { i18n } = useTranslation();
  const [sawAlert, setSawAlert] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const { data } = useQuery('alert', getAlert, {
    // refetch every 6 seconds
    refetchInterval: 6000,
  });

  const getMessageCurrentLang = alertObject => {
    if (!alertObject?.message_de) return alertObject?.message;

    if (i18n.language === 'en') {
      return alertObject?.message;
    } else {
      return alertObject?.message_de;
    }
  };

  useEffect(() => {
    if (!!data) {
      if (data.alert) setOpenAlert(true);
      setSawAlert(false);
    }
  }, [data]);

  useEffect(() => {
    if (!!data && data?.alert) {
      setAlerts([data, ...alerts]);
    }
    // eslint-disable-next-line
  }, [data]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSawAlert(true);
  };

  return (
    <AlertContext.Provider value={{ alerts }}>
      <Snackbar
        open={openAlert && !sawAlert}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        TransitionComponent={Slide}
      >
        <StyledAlert onClose={handleClose} severity="error">
          {getMessageCurrentLang(data)}
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
