import * as React from 'react';
import TableBodyMui from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const navigateToTourOverview = tourId => {
    navigate(`../${tourId}`);
  };

  return (
    <StyledTable>
      {rows.map(row => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={() => navigateToTourOverview(row.id)}
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
