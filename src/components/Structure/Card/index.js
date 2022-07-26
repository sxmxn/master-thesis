import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useTheme } from 'styled-components';

const Card = ({
  children,
  justifyContent = 'center',
  alignItem = 'center',
  display = 'flex',
  width,
  onClick,
  ...rest
}) => {
  const { palette } = useTheme();
  return (
    <Box
      onClick={onClick}
      display={display}
      justifyContent={justifyContent}
      alignItems={alignItem}
      bgcolor={palette.background.dark}
      py={4}
      px={3}
      borderRadius="8px"
      width={width}
      {...rest}
    >
      {children}
    </Box>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  justifyContent: PropTypes.string,
  alignItems: PropTypes.string,
  display: PropTypes.string,
  width: PropTypes.any,
  onClick: PropTypes.func,
};

export default Card;
