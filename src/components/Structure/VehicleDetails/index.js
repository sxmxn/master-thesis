import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Card from 'components/Structure/Card';
import { Truck } from '@styled-icons/boxicons-solid/Truck';
import { PackageIcon } from '@styled-icons/boxicons-solid/PackageIcon';
import { TruckFlatbed } from '@styled-icons/bootstrap/TruckFlatbed';

const List = styled.ul`
  margin: 0;
`;

export default function VehicleDetails({
  loadCapacity,
  boxCapacity,
  vehicleType,
}) {
  return (
    <Card display="block">
      <Typography fontWeight={500} mb={2} color="#fff">
        Vehicle Details
      </Typography>
      <Box px={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <TruckFlatbed size={35} />
          <Box ml={2}>
            Load capacity:
            <List>
              <li>{loadCapacity?.free} free</li>
              <li>{loadCapacity?.loaded} loaded</li>
            </List>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <PackageIcon size={35} />
          <Box ml={2}>
            Box capacity:
            <List>
              <li>{boxCapacity?.free} free</li>
              <li>{boxCapacity?.loaded} loaded</li>
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
