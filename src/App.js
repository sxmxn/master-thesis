import styled from 'styled-components';

const Box = styled.div`
  background: ${({ theme }) => theme.palette.background.light};
  width: 100%;
  padding: 2rem;
  color: ${({ theme }) => theme.palette.text.main};
`;

function App() {
  return (
    <Box>
      IQ-TranS
    </Box>
  );
}

export default App;
