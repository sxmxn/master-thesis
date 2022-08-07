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
import { useNavigate } from 'react-router';
import PageHeader from 'components/Form/PageHeader';
import { useTranslation } from 'react-i18next';

const BoxTemperatureScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      <Box mb={2}>
        <PageHeader goBack={() => navigate(-1)} title={boxId} />
      </Box>
      <Box display="flex">
        <Card width={380} minWidth={380}>
          <BoxPlotLight
            boxes={boxPlotData}
            title={t('box-plot.average-temperature')}
            chartId={`pox-plot-temperature-tour-${tourId}`}
            type="TEMPERATURE"
            labelYAxis={t('box-plot.label-temperature')}
          />
        </Card>
        <Box ml={2}>
          <Card width={590}>
            <AreaChart
              title={`${t('temperatur-line-graph.temperature-of')} ${boxId}`}
              chartId={`area-chart-tour-${tourId}-box-${boxId}`}
              box={data}
              labelYAxis={t('temperatur-line-graph.label-temperature')}
            />
          </Card>
        </Box>
      </Box>
      <Box mt={2} height={250}>
        <Feedback
          rating={data.temperature.feedback.rating}
          text={data.temperature.feedback.text}
          textDe={data.temperature.feedback.text_de}
        />
      </Box>
    </Box>
  );
};

export default BoxTemperatureScreen;
