import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

export const Container = styled.div`
  position: absolute;
  border-radius: 50%;
  top: 50%;
  left: calc(50%);
  transform: translate3d(-50%, -50%, 0);
`;

const Loader = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default Loader;
