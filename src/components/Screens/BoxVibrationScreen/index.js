import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getParameterOfBox } from 'queries';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import Feedback from 'components/Structure/Feedback';
import BarChart from 'components/Structure/BarChart';

const BoxVibrationScreen = () => {
  const { tourId, boxId } = useParams();
  const { isLoading, data } = useQuery(['box', { boxId }], getParameterOfBox);

  if (isLoading) return <Loader />;

  const boxPlotData = [
    {
      boxId: data.id,
      ...data.vibration,
    },
  ];

  return (
    <Box>
      <Box display="flex">
        <Card width={380}>
          <BoxPlotLight
            boxes={boxPlotData}
            title="Average Vibration"
            chartId={`pox-plot-vibration-tour-${tourId}`}
            type="VIBRATION"
          />
        </Card>
        <Box ml={2}>
          <Card width={500}>
            <BarChart
              chartId={`bar-chart-vibration-tour-${tourId}-box-${boxId}`}
              title="Vibration (Displacement index over time)"
              box={data}
            />
          </Card>
        </Box>
      </Box>
      <Box mt={2} height={250}>
        <Feedback
          rating={data.vibration.feedback.rating}
          text={data.vibration.feedback.text}
        />
      </Box>
    </Box>
  );
};

export default BoxVibrationScreen;
