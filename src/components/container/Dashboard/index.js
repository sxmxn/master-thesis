import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { getAllCustomers } from 'queries';
import Loader from 'components/Loader';
import Selector from 'components/Form/Selector';

const Dashboard = () => {
  const { isLoading, data } = useQuery('customers', getAllCustomers);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const selectorItems = useMemo(() => {
    if (data) {
      return data.map(customer => ({
        value: customer?.id,
        label: customer?.name,
      }));
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <Selector
        items={selectorItems}
        onSelect={setSelectedCustomer}
        selected={selectedCustomer}
        placeholder="Customer"
        description="Select Customer"
      />
    </div>
  );
};

export default Dashboard;
