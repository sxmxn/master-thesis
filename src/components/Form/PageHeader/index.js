import React from 'react';
import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/bootstrap/ChevronLeft';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ContainerButton = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  padding: 8px;
  width: fit-content;
  cursor: pointer;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerTitle = styled.div`
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 8px;
  padding: 16px;
  width: fit-content;
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageHeader = ({ goBack, title, height }) => {
  return (
    <Box display="flex">
      {goBack && (
        <ContainerButton height={height} onClick={goBack}>
          <ChevronLeft size={25} />
        </ContainerButton>
      )}
      {title && (
        <Box ml={1}>
          <ContainerTitle height={height}>{title}</ContainerTitle>
        </Box>
      )}
    </Box>
  );
};

PageHeader.propTypes = {
  goBack: PropTypes.func,
  title: PropTypes.string,
  height: PropTypes.number,
};

export default PageHeader;
