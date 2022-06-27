import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import Drawer from 'components/Drawer';
import styled from 'styled-components';

export const PageInnerContainer = styled.div`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  padding: 24px 18px;
`;

const PageContainer = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer />
      <PageInnerContainer>{children}</PageInnerContainer>
    </Box>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
