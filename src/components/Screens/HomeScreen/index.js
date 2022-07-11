import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getAllCustomers, getAllTours } from 'queries';
import Loader from 'components/Loader';
import Selector from 'components/Form/Selector';
import TourTable from 'components/TourTable';
import { useGlobalData } from 'hooks';

const Dashboard = () => {
  const { isLoading, data } = useQuery('customers', getAllCustomers);
  const { isLoading: toursLoading, data: tours } = useQuery(
    'tours',
    getAllTours
  );
  //todo live tours

  // selected customer is stored in global store because we need it in various places
  const { customer, setCustomer } = useGlobalData();

  const selectorItems = useMemo(() => {
    if (data) {
      return data.map(customer => ({
        value: customer?.id,
        label: customer?.name,
      }));
    }
  }, [data]);

  if (isLoading || toursLoading) return <Loader />;

  return (
    <div>
      <Selector
        items={selectorItems}
        onSelect={setCustomer}
        selected={customer}
        placeholder="Customer"
        description="Select Customer"
      />
      <TourTable tours={tours} />
    </div>
  );
};

export default Dashboard;
