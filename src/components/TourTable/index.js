import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from './TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from './TableHead';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Container = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.primary.main} !important;
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: 8px !important;
`;

export default function BasicTable({ tours }) {
  const { t } = useTranslation();

  return (
    <Box mt={2}>
      <Container>
        <Typography fontWeight={500} mb={2} color="#fff">
          {t('customer-table.tours')}
        </Typography>
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
