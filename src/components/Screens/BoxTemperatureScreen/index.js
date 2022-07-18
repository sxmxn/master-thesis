import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getParameterOfBox } from 'queries';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import Feedback from 'components/Structure/Feedback';
import AreaChart from 'components/Structure/AreaChart';

const BoxTemperatureScreen = () => {
  const { tourId, boxId } = useParams();
  const { isLoading, data } = useQuery(['box', { boxId }], getParameterOfBox);

  if (isLoading) return <Loader />;

  const boxPlotData = [
    {
      boxId: data.id,
      ...data.temperature,
    },
  ];

  return (
    <Box>
      <Box display="flex">
        <Card width={380}>
          <BoxPlotLight
            boxes={boxPlotData}
            title="Average Temperature"
            chartId={`pox-plot-temperature-tour-${tourId}`}
          />
        </Card>
        <Box ml={2}>
          <Card width={590}>
            <AreaChart
              title={`Temperature of ${boxId}`}
              chartId={`area-chart-tour-${tourId}-box-${boxId}`}
              box={data}
            />
          </Card>
        </Box>
      </Box>
      <Box mt={2} height={250}>
        <Feedback
          rating={data.temperature.feedback.rating}
          text={data.temperature.feedback.text}
        />
      </Box>
    </Box>
  );
};

export default BoxTemperatureScreen;
