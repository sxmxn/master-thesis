import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour } from 'queries';
import Loader from 'components/Loader';
import { useGlobalData } from 'hooks';

const TourScreen = () => {
  const { tourId } = useParams();
  const { isLoading, data } = useQuery(['tour', { tourId }], getTour);
  const { customer } = useGlobalData();

  console.log(customer, data);

  if (isLoading) return <Loader />;

  return <div></div>;
};

export default TourScreen;
