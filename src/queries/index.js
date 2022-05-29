const REST_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getAllCustomers = async () => {
  const res = await fetch(`${REST_ENDPOINT}/customers`);
  return await res.json();
};
