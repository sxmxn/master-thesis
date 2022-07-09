import * as React from 'react';
import TableBodyMui from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const StyledTable = styled(TableBodyMui)(({ theme }) => ({
  '& tr': {
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },

  '& .MuiTableCell-root': {
    borderBottom: 'none',
    color: '#fff',
    padding: 8,
    cursor: 'pointer',
  },
}));

export default function TableBody({ rows }) {
  return (
    <StyledTable>
      {rows.map(row => {
        const {
          company,
          handover_person: handoverPerson,
          planend_arrival: planendArrival,
          expected_arrival: expectedArrival,
          status,
        } = ({} = row);
        return (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {company}
            </TableCell>
            <TableCell>{handoverPerson}</TableCell>
            <TableCell>{planendArrival}</TableCell>
            <TableCell>{expectedArrival}</TableCell>
            <TableCell>{status}</TableCell>
          </TableRow>
        );
      })}
    </StyledTable>
  );
}

TableBody.propTypes = {
  row: PropTypes.array,
};
