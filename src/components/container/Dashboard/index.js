import React from 'react';
import { useQuery } from 'react-query';
import { getAllCustomers } from 'queries';

const Dashboard = () => {
  const { loading, data } = useQuery('customers', getAllCustomers);
  console.log(data);

  return <div></div>;
};

export default Dashboard;
