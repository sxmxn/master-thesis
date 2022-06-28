import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour, getTourOfCustomer } from 'queries';
import Loader from 'components/Loader';
import { useGlobalData } from 'hooks';

const TourScreen = () => {
  const { tourId } = useParams();
  const { customer } = useGlobalData();
  const { isLoading, data } = useQuery(['tour', { tourId }], getTour);
  const { isLoading: tourCustomerLoading, data: customerSpecificData } =
    useQuery(
      ['tourOfCustomer', { tourId, customerId: customer }],
      getTourOfCustomer,
      {
        // The query will not execute until customer exists
        enabled: !!customer,
      }
    );

  console.log(customerSpecificData);

  if (isLoading || tourCustomerLoading) return <Loader />;

  return <div></div>;
};

export default TourScreen;
