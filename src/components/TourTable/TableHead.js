import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeadMui from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';

export const StyledTableHead = styled(TableHeadMui)(({ theme }) => ({
  '& th': {
    borderBottom: 0,
    color: '#fff',
    padding: 8,
  },
}));

export default function TableHead() {
  return (
    <StyledTableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Driver</TableCell>
        <TableCell>Date</TableCell>
        <TableCell>Start Time</TableCell>
        <TableCell>End Time</TableCell>
        <TableCell>Stops</TableCell>
        <TableCell>Status</TableCell>
        <TableCell />
      </TableRow>
    </StyledTableHead>
  );
}
