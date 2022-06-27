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
import { useTheme } from 'styled-components';
import { useMenuItems } from 'hooks';
import { useNavigate, useLocation, matchPath } from 'react-router';

const DRAWER_WIDTH = 300;

const Drawer = () => {
  const { palette } = useTheme();
  const { menuItems } = useMenuItems();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const checkIfActive = url => {
    if (pathname.includes(url)) return true;

    return !!matchPath(url, pathname);
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
    </MuiDrawer>
  );
};

export default Drawer;