import React from 'react';
import HomeIllustration from 'assets/delivery.png';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Image = styled.img`
  height: auto;
  width: 20%;
`;

const Title = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 16px;
`;

const DefaultScreen = ({ title }) => {
  return (
    <Box height="90vh">
      <Box
        display="flex"
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Image src={HomeIllustration} />
        <Title fontSize={40} fontWeight={700} mb={3} mt={1}>
          {title}
        </Title>
      </Box>
    </Box>
  );
};

DefaultScreen.propTypes = {
  title: PropTypes.string,
};

export default DefaultScreen;
