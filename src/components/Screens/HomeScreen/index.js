import React from 'react';
import HomeIllustration from 'assets/delivery.png';
import styled from 'styled-components';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const Image = styled.img`
  height: auto;
  width: 20%;
`;

const Title = styled(Typography)`
  text-align: center;
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 16px;
`;

const Home = () => {
  const navigate = useNavigate();

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
          Welcome to the IQ-Trans Dashboard
        </Title>
        <Button
          variant="contained"
          onClick={e => {
            navigate(`../dashboard`);
          }}
        >
          go to dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
