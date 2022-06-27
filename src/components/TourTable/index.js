import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from './TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from './TableHead';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import styled from 'styled-components';

const Container = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.primary.main} !important;
  padding: ${({ theme }) => theme.spacing(3)};
`;

export default function BasicTable({ tours }) {
  return (
    <Box mt={2}>
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead />
            <TableBody rows={tours} />
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}

BasicTable.propTypes = {
  tours: PropTypes.array,
};
