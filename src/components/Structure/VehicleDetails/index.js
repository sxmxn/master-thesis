import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Card from 'components/Structure/Card';
import { Truck } from '@styled-icons/boxicons-solid/Truck';
import { PackageIcon } from '@styled-icons/boxicons-solid/PackageIcon';
import { TruckFlatbed } from '@styled-icons/bootstrap/TruckFlatbed';
import { useTranslation } from 'react-i18next';

const List = styled.ul`
  margin: 0;
`;

export default function VehicleDetails({
  loadCapacity,
  boxCapacity,
  vehicleType,
}) {
  const { t } = useTranslation();

  return (
    <Card display="block" minWidth={300} width="auto">
      <Typography fontWeight={500} mb={2} color="#fff">
        {t('vehicle-details.vehicle-details')}
      </Typography>
      <Box px={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <TruckFlatbed size={35} />
          <Box ml={2}>
            {t('vehicle-details.load-capacity')}:
            <List>
              <li>
                {loadCapacity?.free} {t('vehicle-details.free')}
              </li>
              <li>
                {loadCapacity?.loaded} {t('vehicle-details.loaded')}
              </li>
            </List>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <PackageIcon size={35} />
          <Box ml={2}>
            {t('vehicle-details.box-capacity')}:
            <List>
              <li>
                {boxCapacity?.free} {t('vehicle-details.free')}
              </li>
              <li>
                {boxCapacity?.loaded} {t('vehicle-details.loaded')}
              </li>
            </List>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Truck size={35} />
          <Box ml={2}>{vehicleType}</Box>
        </Box>
      </Box>
    </Card>
  );
}

VehicleDetails.propTypes = {
  loadCapacity: PropTypes.object.isRequired,
  boxCapacity: PropTypes.object.isRequired,
  vehicleType: PropTypes.string.isRequired,
};
