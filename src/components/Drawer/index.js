import React from 'react';
import {
  Drawer as MuiDrawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Truck as Logo } from '@styled-icons/boxicons-solid/Truck';
import styled, { useTheme } from 'styled-components';
import { useMenuItems } from 'hooks';
import { useNavigate, useLocation, matchPath } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Globe } from '@styled-icons/bootstrap/Globe';

const DRAWER_WIDTH = 300;

const LanguageContainer = styled.div`
  cursor: pointer;
  font-size: 18px;
  margin-right: 2rem;
  font-weight: 600;
  display: flex;
`;

const Drawer = () => {
  const { t, i18n } = useTranslation();
  const { palette } = useTheme();
  const { menuItems } = useMenuItems();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const checkIfActive = url => {
    if (pathname.includes(url)) return true;

    return !!matchPath(url, pathname);
  };

  const handleChangeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('de');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <MuiDrawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          background: palette.background.dark,
          color: palette.text.main,
        },
      }}
      variant="persistent"
      anchor="left"
      open
    >
      <Box display="flex" justifyContent="center" alignItems="center" my={5}>
        <Logo size={80} />
      </Box>
      <List>
        {menuItems.map(({ text, url, icon }, index) => {
          const Icon = icon;
          const isActive = checkIfActive(url);
          return (
            <ListItem
              key={text}
              disablePadding
              onClick={() => navigate(url)}
              sx={{
                backgroundColor: isActive
                  ? palette.primary.light
                  : palette.primary.main,
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon size={20} color={palette.text.main} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Box
        display="flex"
        height="100%"
        alignItems="flex-end"
        justifyContent="center"
        marginBottom={4}
      >
        <LanguageContainer onClick={handleChangeLanguage}>
          <Box mr={1} display="flex" alignItems="center">
            <Globe size={20} />
          </Box>{' '}
          {t('available-language')}
        </LanguageContainer>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
