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
import Histogram from 'components/Structure/Histogram';
import PageHeader from 'components/Form/PageHeader';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const BoxVibrationScreen = () => {
  const { t } = useTranslation();
  const { tourId, boxId } = useParams();
  const { isLoading, data } = useQuery(['box', { boxId }], getParameterOfBox);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  const boxPlotData = [
    {
      boxId: data.id,
      ...data.vibration,
    },
  ];

  return (
    <Box>
      <Box mb={2}>
        <PageHeader goBack={() => navigate(-1)} title={boxId} />
      </Box>
      <Box display="flex">
        <Card width={380} minWidth={380}>
          <BoxPlotLight
            boxes={boxPlotData}
            title={t('box-plot.average-vibration')}
            chartId={`pox-plot-vibration-tour-${tourId}`}
            type="VIBRATION"
          />
        </Card>
        <Box ml={2}>
          <Card width={500}>
            <BarChart
              chartId={`bar-chart-vibration-tour-${tourId}-box-${boxId}`}
              title={t('bar-chart.vibration')}
              box={data}
            />
          </Card>
        </Box>
      </Box>
      <Box mt={2} height={250} display="flex">
        <Box mr={2}>
          <Card width={500}>
            <Histogram
              chartId={`histogram-vibration-tour-${tourId}-box-${boxId}`}
              title={t('histogram.vibration')}
              box={data}
            />
          </Card>
        </Box>
        <Feedback
          rating={data.vibration.feedback.rating}
          text={data.vibration.feedback.text}
        />
      </Box>
    </Box>
  );
};

export default BoxVibrationScreen;
