import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getParameterOfTour, getTour, getParameterOfBoxes } from 'queries';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import MultiLineChart from 'components/Structure/MultiLineChart';

const ParameterDetailsScreen = ({ type = 'TEMPERATURE' }) => {
  const { tourId } = useParams();
  const { isLoading: tourParameterLoading, data: tourParameter } = useQuery(
    ['tourParameter', { tourId }],
    getParameterOfTour
  );
  const { isLoading: tourLoading, data: { boxes = [] } = {} } = useQuery(
    ['tour', { tourId }],
    getTour
  );
  const { isLoading: boxesLoading, data: boxesData } = useQuery(
    ['boxes', { boxes }],
    getParameterOfBoxes,
    {
      // The query will not execute until the userId exists
      enabled: !!boxes.length,
    }
  );

  if (tourParameterLoading || tourLoading || boxesLoading) return <Loader />;

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
      {type === 'TEMPERATURE' && (
        <Box ml={2}>
          <Card width={500}>
            <MultiLineChart
              title="Temperature"
              chartId={`multi-line-chart-tour-${tourId}`}
              boxes={boxesData}
            />
          </Card>
        </Box>
      )}
    </Box>
  );
};

ParameterDetailsScreen.propTypes = {
  type: PropTypes.oneOf(['TEMPERATURE', 'VIBRATION']),
};

export default ParameterDetailsScreen;
