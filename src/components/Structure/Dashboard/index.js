import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllCustomers, getAllTours } from 'queries';
import Loader from 'components/Loader';
import Selector from 'components/Form/Selector';
import TourTable from 'components/TourTable';

const Dashboard = () => {
  const { isLoading, data } = useQuery('customers', getAllCustomers);
  const { isLoading: toursLoading, data: tours } = useQuery(
    'tours',
    getAllTours
  );
  //todo live tours
  const [selectedCustomer, setSelectedCustomer] = useState('');

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
        onSelect={setSelectedCustomer}
        selected={selectedCustomer}
        placeholder="Customer"
        description="Select Customer"
      />
      <TourTable tours={tours} />
    </div>
  );
};

export default Dashboard;
