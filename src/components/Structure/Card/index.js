import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useTheme } from 'styled-components';

const IllustrationCard = ({
  children,
  justifyContent = 'center',
  alignItem = 'center',
  display = 'flex',
  width,
}) => {
  const { palette } = useTheme();
  return (
    <Box
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItem}
      bgcolor={palette.background.dark}
      py={4}
      px={6}
      borderRadius="8px"
      width={width}
    >
      {children}
    </Box>
  );
};

IllustrationCard.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  display: PropTypes.string,
  width: PropTypes.number,
};

export default IllustrationCard;
