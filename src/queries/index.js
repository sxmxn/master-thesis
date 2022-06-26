const REST_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getAllCustomers = async () => {
  const res = await fetch(`${REST_ENDPOINT}/customers`);
  return await res.json();
};

export const getAllTours = async () => {
  const res = await fetch(`${REST_ENDPOINT}/tours`);
  return await res.json();
};
