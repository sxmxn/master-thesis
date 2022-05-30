import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useTheme } from 'styled-components';

const IllustrationCard = ({ description, icon, width = 500, height = 180 }) => {
  const Icon = icon;
  const { palette } = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width={width}
      height={height}
      bgcolor={palette.background.dark}
      py={4}
      px={6}
      borderRadius="8px"
    >
      <Typography fontSize={25} color="#fff" fontWeight={500} maxWidth={240}>
        {description}
      </Typography>
      <Box alignSelf="flex-end">
        <Icon color="#fff" size={80} />{' '}
      </Box>
    </Box>
  );
};

IllustrationCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default IllustrationCard;
