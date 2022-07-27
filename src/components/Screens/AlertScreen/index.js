import React, { Fragment } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import { ExclamationTriangleFill } from '@styled-icons/bootstrap/ExclamationTriangleFill';
import styled from 'styled-components';
import useAlert from 'hooks/useAlert';
import { useTranslation } from 'react-i18next';

const StyledItem = styled(ListItemButton)`
  background: #fff !important;
`;

const StyledText = styled(ListItemText)`
  color: ${({ theme }) => theme.palette.text.secondary};
  span {
    font-weight: 400 !important;
  }

  p {
    font-weight: 200 !important;
  }
`;

const StyledIcon = styled(ExclamationTriangleFill)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;

const Container = styled(Box)`
  // background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  padding: 8px 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Title = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 16px;
`;

const AlertScreen = () => {
  const { alerts } = useAlert();
  const { i18n, t } = useTranslation();

  const getMessageCurrentLang = alertObject => {
    if (!alertObject?.message_de) return alertObject?.message;

    if (i18n.language === 'en') {
      return alertObject?.message;
    } else {
      return alertObject?.message_de;
    }
  };

  return (
    <Fragment>
      <Title fontSize={30} fontWeight={700}>
        Alerts
      </Title>
      <Container>
        <List>
          {!alerts?.length && (
            <ListItem disablePadding>
              <StyledItem>
                <ListItemIcon>
                  <StyledIcon size={20} />
                </ListItemIcon>
                <StyledText primary={t('no-alerts')} />
              </StyledItem>
            </ListItem>
          )}
          {alerts?.map((alert, index) => (
            <Box key={index}>
              <ListItem disablePadding>
                <StyledItem>
                  <ListItemIcon>
                    <StyledIcon size={20} />
                  </ListItemIcon>
                  <StyledText
                    primary={getMessageCurrentLang(alert)}
                    secondary={alert.time}
                  />
                </StyledItem>
              </ListItem>
              {index !== alerts.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Container>
    </Fragment>
  );
};

export default AlertScreen;
