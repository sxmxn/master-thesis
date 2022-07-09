import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTour, getTourOfCustomer, getParameterOfTour } from 'queries';
import Loader from 'components/Loader';
import { useGlobalData } from 'hooks';
import Card from 'components/Structure/Card';
import BoxPlotLight from 'components/Structure/BoxPlotLight';

const TourScreen = () => {
  const { tourId } = useParams();
  const { customer } = useGlobalData();
  const { isLoading, data } = useQuery(['tour', { tourId }], getTour);
  const { isLoading: tourParameterLoading, data: tourParameter } = useQuery(
    ['tourParameter', { tourId }],
    getParameterOfTour
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

  console.log(tourParameterLoading, tourId);

  if (tourParameterLoading || tourCustomerLoading || isLoading)
    return <Loader />;

  return (
    <div>
      <Card width={380}>
        <BoxPlotLight
          boxes={tourParameter.boxesTemperature}
          title=" Temperature"
          chartId={`pox-plot-temperature-tour-${tourId}`}
        />
      </Card>
    </div>
  );
};

export default TourScreen;
