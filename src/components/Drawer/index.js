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
import { Truck } from '@styled-icons/bootstrap/Truck';
import { Truck as Logo } from '@styled-icons/boxicons-solid/Truck';
import { useTheme } from 'styled-components';

const DRAWER_WIDTH = 300;

const Drawer = props => {
  const { palette } = useTheme();

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
        {['Main', 'Tour Dashboard', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Truck size={20} color={palette.text.main} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
