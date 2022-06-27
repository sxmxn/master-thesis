const REST_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const getAllCustomers = async () => {
  const res = await fetch(`${REST_ENDPOINT}/customers`);
  return await res.json();
};

export const getAllTours = async () => {
  const res = await fetch(`${REST_ENDPOINT}/tours`);

  //format tours
  const data = await res.json();
  const formattedData = data.map(tour => ({
    id: tour.id,
    name: tour.name,
    driver: tour.driver,
    date: tour.date,
    startTime: tour.start_time,
    endTime: tour.end_time,
    stops: tour.stops,
    status: tour.status,
    temperaturStatus: tour.temperatur_status,
    vibrationStatus: tour.vibration_status,
  }));

  return await formattedData;
};

export const getTour = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_key, { tourId }] = queryKey;
  const res = await fetch(`${REST_ENDPOINT}/tours/${tourId}`);

  //format tour data
  const tour = await res.json();
  return {
    id: tour.id,
    name: tour.name,
    driver: tour.driver,
    date: tour.date,
    startTime: tour.start_time,
    endTime: tour.end_time,
    stops: tour.stops,
    status: tour.status,
    boxes: tour.boxes,
    route: tour.route,
    parameter: tour.parameter,
  };
};

export const getTourOfCustomer = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_key, { tourId, customerId }] = queryKey;
  console.log(tourId, customerId);
  const res = await fetch(
    `${REST_ENDPOINT}/customers/${customerId}/tours/${tourId}`
  );

  //format tour data
  const tour = await res.json();
  return {
    id: tour.id,
    handoverDetails: tour.handover_details,
    order: tour.order,
  };
};
