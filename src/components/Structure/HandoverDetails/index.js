import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import Card from 'components/Structure/Card';
import { Truck } from '@styled-icons/boxicons-solid/Truck';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';
import { TimeFive } from '@styled-icons/boxicons-solid/TimeFive';
import { useTranslation } from 'react-i18next';
import { MapPin } from '@styled-icons/boxicons-solid/MapPin';
import { Temperature } from '@styled-icons/fluentui-system-filled/Temperature';

export default function HandoverDetails({
  address,
  time,
  temperature,
  handoverPerson,
}) {
  const { t } = useTranslation();

  return (
    <Card display="block">
      <Typography fontWeight={500} mb={2} color="#fff">
        {t('handover-details')}
      </Typography>
      <Box px={2}>
        <Box display="flex" alignItems="center" mt={2}>
          <MapPin size={35} />
          <Box ml={2}>{address}</Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <TimeFive size={35} />
          <Box ml={2}>{time}</Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <Temperature size={35} />
          <Box ml={2}>{temperature}°C</Box>
        </Box>
        <Box display="flex" alignItems="center" mt={2}>
          <PersonFill size={35} />
          <Box ml={2}>{handoverPerson}</Box>
        </Box>
      </Box>
    </Card>
  );
}

HandoverDetails.propTypes = {
  address: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  handoverPerson: PropTypes.string.isRequired,
};
