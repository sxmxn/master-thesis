import styled from 'styled-components';
import React from 'react';

const Box = styled.div`
  background: ${({ theme }) => theme.palette.background.light};
  padding: 2rem;
  color: ${({ theme }) => theme.palette.text.main};
`;

function App() {
  return <Box>IQ-TranS</Box>;
}

export default App;
