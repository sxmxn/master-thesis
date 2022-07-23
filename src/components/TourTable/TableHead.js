import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHeadMui from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

export const StyledTableHead = styled(TableHeadMui)(({ theme }) => ({
  '& th': {
    borderBottom: 0,
    color: '#fff',
    padding: 8,
  },
}));

export default function TableHead() {
  const { t } = useTranslation();
  return (
    <StyledTableHead>
      <TableRow>
        <TableCell>{t('customer-table.name')}</TableCell>
        <TableCell>{t('customer-table.driver')}</TableCell>
        <TableCell>{t('customer-table.date')}</TableCell>
        <TableCell>{t('customer-table.start-time')}</TableCell>
        <TableCell>{t('customer-table.end-time')}</TableCell>
        <TableCell>{t('customer-table.stops')}</TableCell>
        <TableCell>{t('customer-table.status')}</TableCell>
        <TableCell />
      </TableRow>
    </StyledTableHead>
  );
}
