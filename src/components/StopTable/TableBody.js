import * as React from 'react';
import TableBodyMui from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getColorStatus } from 'utils/colors';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <StyledTable>
      {rows.map((row, index) => {
        const {
          company,
          handover_person: handoverPerson,
          planned_arrival: plannedArrival,
          expected_arrival: expectedArrival,
          status,
        } = row;
        return (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {company}
            </TableCell>
            <TableCell>{handoverPerson}</TableCell>
            <TableCell>{plannedArrival}</TableCell>
            <TableCell>{expectedArrival}</TableCell>
            <TableCell>
              <Typography color={getColorStatus(status)}>
                {t(`stop-table.${status}`)}
              </Typography>
            </TableCell>
          </TableRow>
        );
      })}
    </StyledTable>
  );
}

TableBody.propTypes = {
  row: PropTypes.array,
};
