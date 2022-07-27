import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import {
  getParameterOfTour,
  getTour,
  getParameterOfBoxes,
  getTourOfCustomer,
} from 'queries';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/Loader';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box } from '@mui/material';
import MultiLineChart from 'components/Structure/MultiLineChart';
import Feedback from 'components/Structure/Feedback';
import Selector from 'components/Form/Selector';
import PageHeader from '../../Form/PageHeader';
import { useGlobalData } from '../../../hooks';
import { useTranslation } from 'react-i18next';

const ParameterDetailsScreen = ({ type = 'TEMPERATURE' }) => {
  const { t } = useTranslation();
  const { tourId } = useParams();
  const { customer } = useGlobalData();
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
  const { isLoading: tourCustomerLoading, data: customerSpecificData } =
    useQuery(
      ['tourOfCustomer', { tourId, customerId: customer }],
      getTourOfCustomer,
      {
        // The query will not execute until customer exists
        enabled: !!customer,
      }
    );
  const { isLoading: boxesLoading, data: boxesData } = useQuery(
    ['boxes', { boxes }],
    getParameterOfBoxes,
    {
      // The query will not execute until the boxes exists
      enabled: !!boxes.length,
    }
  );

  const filteredBoxesTemperature = useMemo(() => {
    if (!tourParameter) return [];

    if (!customer || !customerSpecificData)
      return tourParameter?.boxesTemperature;

    return tourParameter.boxesTemperature?.filter(box =>
      customerSpecificData.boxes.includes(box.boxId)
    );
  }, [customer, tourParameter, customerSpecificData]);

  const filteredBoxesData = useMemo(() => {
    if (!boxesData) return;

    if (!customer || !customerSpecificData) return boxesData;

    return boxesData?.filter(box =>
      customerSpecificData.boxes.includes(box.id)
    );
  }, [customer, boxesData, customerSpecificData]);

  const filteredBoxesVibration = useMemo(() => {
    if (!tourParameter) return;

    if (!customer || !customerSpecificData)
      return tourParameter?.boxesVibration;

    return tourParameter.boxesVibration.filter(box =>
      customerSpecificData.boxes.includes(box.boxId)
    );
  }, [tourParameter, customer, customerSpecificData]);

  const selectorItems = useMemo(() => {
    if (boxes && !!boxes?.length) {
      return boxes
        .filter(box =>
          !!customerSpecificData
            ? customerSpecificData.boxes.includes(box)
            : box
        )
        .map(box => ({
          value: box,
          label: box,
        }));
    }
  }, [boxes, customerSpecificData]);

  if (
    tourParameterLoading ||
    tourLoading ||
    boxesLoading ||
    tourCustomerLoading
  )
    return <Loader />;

  return (
    <Box>
      <Box mb={2} display="flex">
        <PageHeader goBack={() => navigate(-1)} />
        <Box ml={1}>
          <Selector
            items={selectorItems}
            onSelect={navigateToBox}
            selected={''}
            placeholder={t('box')}
            description={t('select-box')}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Card width={380} minWidth={380}>
          {type === 'TEMPERATURE' ? (
            <BoxPlotLight
              boxes={filteredBoxesTemperature}
              title={t('box-plot.average-temperature')}
              chartId={`pox-plot-temperature-tour-${tourId}`}
              type="TEMPERATURE"
            />
          ) : (
            <BoxPlotLight
              boxes={filteredBoxesVibration}
              title={t('box-plot.average-vibration')}
              chartId={`pox-plot-vibration-tour-${tourId}`}
              type="VIBRATION"
            />
          )}
        </Card>
        {type === 'TEMPERATURE' ? (
          <Box ml={2}>
            <Card width={500}>
              <MultiLineChart
                title={t('multi-line-graph.temperature')}
                chartId={`multi-line-chart-tour-${tourId}`}
                boxes={filteredBoxesData}
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
