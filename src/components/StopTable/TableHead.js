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
        <TableCell>Company</TableCell>
        <TableCell>Handover Person</TableCell>
        <TableCell>Planned Arrival Time</TableCell>
        <TableCell>Expected Arrival</TableCell>
        <TableCell>Status</TableCell>
        <TableCell />
      </TableRow>
    </StyledTableHead>
  );
}
