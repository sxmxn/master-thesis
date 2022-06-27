import * as React from 'react';
import TableBodyMui from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledTable = styled(TableBodyMui)(({ theme }) => ({
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    color: '#fff',
    padding: 8,
  },
}));

export default function TableBody({ rows }) {
  return (
    <StyledTable>
      {rows.map(row => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.driver}</TableCell>
          <TableCell>{row.date}</TableCell>
          <TableCell>{row.startTime}</TableCell>
          <TableCell>{row.endTime}</TableCell>
          <TableCell>{row.stops}</TableCell>
          <TableCell>{row.status}</TableCell>
          <TableCell>
            {row.temperaturStatus} | {row.vibrationStatus}
          </TableCell>
        </TableRow>
      ))}
    </StyledTable>
  );
}

TableBody.propTypes = {
  row: PropTypes.array,
};
