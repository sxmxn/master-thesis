import React, { Fragment, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour, getTourOfCustomer, getParameterOfTour } from 'queries';
import Loader from 'components/Loader';
import { useCustomerData } from 'hooks';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';
import { Box, Typography, Button } from '@mui/material';
import StopTable from 'components/StopTable';
import Map from 'components/Map';
import { useTheme } from 'styled-components';
import VehicleDetails from 'components/Structure/VehicleDetails';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import HandoverDetails from 'components/Structure/HandoverDetails';
import OrderDetails from 'components/Structure/OrderDetails';
import styled from 'styled-components';
import PageHeader from 'components/Form/PageHeader';

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.light} !important;
`;

const TourScreen = () => {
  const { t } = useTranslation();
  const { palette } = useTheme();
  const { tourId } = useParams();
  const { customer } = useCustomerData();
  const navigate = useNavigate();
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

  const filteredBoxesTemperature = useMemo(() => {
    if (!tourParameter) return [];

    if (!customer || !customerSpecificData)
      return tourParameter?.boxesTemperature;

    return tourParameter.boxesTemperature.filter(box =>
      customerSpecificData.boxes.includes(box.boxId)
    );
  }, [customer, tourParameter, customerSpecificData]);

  const filteredBoxesVibration = useMemo(() => {
    if (!tourParameter) return;

    if (!customer || !customerSpecificData)
      return tourParameter?.boxesVibration;

    return tourParameter.boxesVibration.filter(box =>
      customerSpecificData.boxes.includes(box.boxId)
    );
  }, [tourParameter, customer, customerSpecificData]);

  if (tourParameterLoading || tourCustomerLoading || isLoading)
    return <Loader />;

  return (
    <div>
      <Box mb={2}>
        <PageHeader
          goBack={() => navigate(-1)}
          title={
            customerSpecificData
              ? `${customerSpecificData.customerName} | ${data.name}`
              : data.name
          }
        />
      </Box>
      <Box display="flex">
        <Card width={380} minWidth={380} height={340} flexDirection="column">
          <BoxPlotLight
            boxes={filteredBoxesTemperature}
            title={t('box-plot.average-temperature')}
            chartId={`pox-plot-temperature-tour-${tourId}`}
            type="TEMPERATURE"
            labelYAxis={t('box-plot.label-temperature')}
          />
          <StyledButton
            variant="contained"
            onClick={() => navigate('temperature')}
          >
            {t('box-plot.temperature-details')}
          </StyledButton>
        </Card>
        <Box ml={2}>
          <Card width={380} height={340} flexDirection="column">
            <BoxPlotLight
              boxes={filteredBoxesVibration}
              title={t('box-plot.average-vibration')}
              chartId={`pox-plot-vibration-tour-${tourId}`}
              type="VIBRATION"
              labelYAxis="Displacement Index"
            />
            <StyledButton
              variant="contained"
              onClick={() => navigate('vibration')}
            >
              {t('box-plot.vibration-details')}
            </StyledButton>
          </Card>
        </Box>
        <Box ml={2}>
          {!!customerSpecificData && data.status === 'COMPLETED' ? (
            <HandoverDetails
              address={customerSpecificData?.handoverDetails?.location?.address}
              temperature={customerSpecificData?.handoverDetails?.temperature}
              time={customerSpecificData?.handoverDetails?.date}
              handoverPerson={customerSpecificData?.handoverDetails?.receiver}
            />
          ) : (
            <VehicleDetails
              boxCapacity={data?.vehicleDetails?.box_capacity}
              loadCapacity={data?.vehicleDetails?.load_capacity}
              vehicleType={data?.vehicleDetails?.vehicle_type}
            />
          )}
        </Box>
      </Box>
      {!!customerSpecificData ? (
        <Box mt={2} width={350}>
          <OrderDetails
            portions={customerSpecificData?.order.portions}
            boxes={customerSpecificData?.order.boxes}
          />
        </Box>
      ) : (
        <Fragment>
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
              <Typography fontWeight={500} color="#fff">
                {data?.name}
              </Typography>
            </Box>
            <Map mapData={data.route} />
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default TourScreen;
