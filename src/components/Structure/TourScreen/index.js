import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour } from 'queries';
import Loader from '../../Loader';

const TourScreen = () => {
  const { tourId } = useParams();
  const { isLoading, data } = useQuery(['tour', { tourId }], getTour);

  if (isLoading) return <Loader />;

  return <div></div>;
};

export default TourScreen;
