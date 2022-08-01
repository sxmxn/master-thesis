import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getAllCustomers, getAllTours, getLiveTours } from 'queries';
import Loader from 'components/Loader';
import Selector from 'components/Form/Selector';
import TourTable from 'components/TourTable';
import { useCustomerData } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import Map from 'components/Map';
import { useTheme } from 'styled-components';

const Dashboard = () => {
  const { palette } = useTheme();
  const { t } = useTranslation();
  const { isLoading, data = [] } = useQuery('customers', getAllCustomers);
  const { isLoading: toursLoading, data: tours = [] } = useQuery(
    'tours',
    getAllTours
  );
  const { isLoading: liveLoading, data: liveTours = [] } = useQuery(
    'liveTours',
    getLiveTours,
    {
      // refetch every 6 seconds
      refetchInterval: 6000,
    }
  );

  // selected customer is stored in global store because we need it in various places
  const { customer, setCustomer } = useCustomerData();

  const selectorItems = useMemo(() => {
    if (data) {
      return data.map(customer => ({
        value: customer?.id,
        label: customer?.name,
      }));
    }
  }, [data]);

  const selectedCustomer = useMemo(() => {
    if (!customer) return;
    return data?.find(user => user.id === customer);
  }, [customer, data]);

  const filteredLiveTours = useMemo(() => {
    if (!selectedCustomer) return liveTours;
    return liveTours?.filter(tour =>
      selectedCustomer?.tours?.includes(tour?.id)
    );
  }, [liveTours, selectedCustomer]);

  const geoJsonLiveTours = useMemo(() => {
    if (!filteredLiveTours) return null;

    const features = filteredLiveTours?.map(tour => ({
      type: 'Feature',
      properties: {
        tour: tour?.name,
        tourId: tour?.id,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          tour?.location?.coordinates.lng,
          tour?.location?.coordinates.lat,
        ],
      },
    }));

    return {
      type: 'FeatureCollection',
      features: features,
    };
  }, [filteredLiveTours]);

  const filteredTours = useMemo(() => {
    if (!selectedCustomer) return tours;
    return tours.filter(tour => selectedCustomer.tours.includes(tour.id));
  }, [tours, selectedCustomer]);

  if (isLoading || toursLoading || liveLoading) return <Loader />;

  return (
    <div>
      <Selector
        items={selectorItems}
        onSelect={setCustomer}
        selected={customer}
        placeholder={t('customer')}
        description={t('select-customer')}
      />
      <TourTable tours={filteredTours} />
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
            {t('live-map')}
          </Typography>
        </Box>
        <Map
          mapData={!!liveTours.length && geoJsonLiveTours}
          mapHeight={500}
          liveMap={!!liveTours.length}
        />
      </Box>
    </div>
  );
};

export default Dashboard;
