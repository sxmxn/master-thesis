import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getParameterOfTour } from 'queries';
import { useParams, useLocation } from 'react-router-dom';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';

const ParameterDetailsScreen = ({ type = 'TEMPERATURE' }) => {
  const { tourId } = useParams();
  const {
    state: { boxes },
  } = useLocation();
  const { isLoading: tourParameterLoading, data: tourParameter } = useQuery(
    ['tourParameter', { tourId }],
    getParameterOfTour
  );

  //ToDo use boxes to fetch parameter data for every box

  if (tourParameterLoading) return <Loader />;

  return (
    <Box display="flex">
      <Card width={380}>
        {type === 'TEMPERATURE' ? (
          <BoxPlotLight
            boxes={tourParameter.boxesTemperature}
            title="Average Temperature"
            chartId={`pox-plot-temperature-tour-${tourId}`}
          />
        ) : (
          <BoxPlotLight
            boxes={tourParameter.boxesVibration}
            title="Average Vibration"
            chartId={`pox-plot-vibration-tour-${tourId}`}
            type="VIBRATION"
          />
        )}
      </Card>
    </Box>
  );
};

ParameterDetailsScreen.propTypes = {
  type: PropTypes.oneOf(['TEMPERATURE', 'VIBRATION']),
};

export default ParameterDetailsScreen;
