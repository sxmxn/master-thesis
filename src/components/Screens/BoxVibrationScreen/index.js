import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getParameterOfBox } from 'queries';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import Feedback from 'components/Structure/Feedback';

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
        <Box ml={2}></Box>
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
