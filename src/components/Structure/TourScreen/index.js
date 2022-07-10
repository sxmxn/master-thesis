import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour, getTourOfCustomer, getParameterOfTour } from 'queries';
import Loader from 'components/Loader';
import { useGlobalData } from 'hooks';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box, Typography } from '@mui/material';
import StopTable from 'components/StopTable';
import Map from 'components/Map';
import { useTheme } from 'styled-components';

const TourScreen = () => {
  const { palette } = useTheme();
  const { tourId } = useParams();
  const { customer } = useGlobalData();
  const { isLoading, data } = useQuery(['tour', { tourId }], getTour);
  const { isLoading: tourParameterLoading, data: tourParameter } = useQuery(
    ['tourParameter', { tourId }],
    getParameterOfTour
  );
  // eslint-disable-next-line
  const { isLoading: tourCustomerLoading, data: customerSpecificData } =
    useQuery(
      ['tourOfCustomer', { tourId, customerId: customer }],
      getTourOfCustomer,
      {
        // The query will not execute until customer exists
        enabled: !!customer,
      }
    );

  if (tourParameterLoading || tourCustomerLoading || isLoading)
    return <Loader />;

  return (
    <div>
      <Box display="flex">
        <Card width={380}>
          <BoxPlotLight
            boxes={tourParameter.boxesTemperature}
            title="Average Temperature"
            chartId={`pox-plot-temperature-tour-${tourId}`}
          />
        </Card>
        <Box ml={2}>
          <Card width={380}>
            <BoxPlotLight
              boxes={tourParameter.boxesVibration}
              title="Average Vibration"
              chartId={`pox-plot-vibration-tour-${tourId}`}
              type="VIBRATION"
            />
          </Card>
        </Box>
      </Box>
      <StopTable stops={data.stops} />
      <Box borderRadius={2} mt={2} boxShadow={2} position="relative">
        <Box
          position="absolute"
          bgcolor={palette.primary.main}
          px={5}
          py={1}
          zIndex={999}
          borderRadius={1}
        >
          <Typography fontSize={14} fontWeight={500} color="#fff">
            {data?.name}
          </Typography>
        </Box>
        <Map mapData={data.route} />
      </Box>
    </div>
  );
};

export default TourScreen;
