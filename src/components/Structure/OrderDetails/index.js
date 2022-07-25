import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Card from 'components/Structure/Card';
import { useTranslation } from 'react-i18next';
import { PackageIcon } from '@styled-icons/boxicons-solid/PackageIcon';
import { TestTube } from '@styled-icons/boxicons-regular/TestTube';

export default function OrderDetails({ portions, boxes }) {
  const { t } = useTranslation();

  return (
    <Card display="block">
      <Typography fontWeight={500} mb={2} color="#fff">
        {t('order-details.order-details')}
      </Typography>
      <Box px={2} display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" alignItems="center" mt={2}>
          <TestTube size={45} />
          <Box ml={2}>
            <Typography fontSize={20} fontWeight={600}>
              {portions} {t('order-details.portions')}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <PackageIcon size={45} />
          <Box ml={2}>
            <Typography fontSize={20} fontWeight={600}>
              {boxes} {t('order-details.boxes')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

OrderDetails.propTypes = {
  portions: PropTypes.number.isRequired,
  boxes: PropTypes.number.isRequired,
};
