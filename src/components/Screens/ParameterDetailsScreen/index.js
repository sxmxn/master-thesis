import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { getParameterOfTour, getTour, getParameterOfBoxes } from 'queries';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import MultiLineChart from 'components/Structure/MultiLineChart';
import Feedback from 'components/Structure/Feedback';
import Selector from 'components/Form/Selector';
import PageHeader from '../../Form/PageHeader';

const ParameterDetailsScreen = ({ type = 'TEMPERATURE' }) => {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const navigateToBox = boxId => {
    navigate(`../box/${boxId}`);
  };
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
      // The query will not execute until the boxes exists
      enabled: !!boxes.length,
    }
  );

  const selectorItems = useMemo(() => {
    if (boxes) {
      return boxes.map(box => ({
        value: box,
        label: box,
      }));
    }
  }, [boxes]);

  if (tourParameterLoading || tourLoading || boxesLoading) return <Loader />;

  return (
    <Box>
      <Box mb={2} display="flex">
        <PageHeader goBack={() => navigate(-1)} />
        <Box ml={1}>
          <Selector
            items={selectorItems}
            onSelect={navigateToBox}
            selected={''}
            placeholder="Box"
            description="Select a Box"
          />
        </Box>
      </Box>
      <Box display="flex">
        <Card width={380} minWidth={380}>
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
        {type === 'TEMPERATURE' ? (
          <Box ml={2}>
            <Card width={500}>
              <MultiLineChart
                title="Temperature"
                chartId={`multi-line-chart-tour-${tourId}`}
                boxes={boxesData}
              />
            </Card>
          </Box>
        ) : (
          <Box ml={2}>
            <Feedback
              rating={tourParameter.feedbackVibration.rating}
              text={tourParameter.feedbackVibration.text}
            />
          </Box>
        )}
      </Box>
      {type === 'TEMPERATURE' && (
        <Box mt={2} height={250}>
          <Feedback
            rating={tourParameter.feedbackTemperature.rating}
            text={tourParameter.feedbackTemperature.text}
          />
        </Box>
      )}
    </Box>
  );
};

ParameterDetailsScreen.propTypes = {
  type: PropTypes.oneOf(['TEMPERATURE', 'VIBRATION']),
};

export default ParameterDetailsScreen;
