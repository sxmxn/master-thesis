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
        <TableCell>{t('stop-table.company')}</TableCell>
        <TableCell>{t('stop-table.handover-person')}</TableCell>
        <TableCell>{t('stop-table.planned-arrival')}</TableCell>
        <TableCell>{t('stop-table.expected-arrival')}</TableCell>
        <TableCell>{t('stop-table.status')}</TableCell>
        <TableCell />
      </TableRow>
    </StyledTableHead>
  );
}
