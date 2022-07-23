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
    vehicleDetails: tour.vehicle_details,
  };
};

export const getTourOfCustomer = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_key, { tourId, customerId }] = queryKey;
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

export const getParameterOfTour = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_key, { tourId }] = queryKey;
  const res = await fetch(`${REST_ENDPOINT}/parameter/tour/${tourId}`);

  const tourParameter = await res.json();
  return {
    id: tourParameter.id,
    boxesTemperature: tourParameter.boxes_temperature,
    boxesVibration: tourParameter.boxes_vibration,
    feedbackTemperature: tourParameter.feedback_temperature,
    feedbackVibration: tourParameter.feedback_vibration,
  };
};

export const getParameterOfBoxes = async ({ queryKey }) => {
  // eslint-disable-next-line
  const [_key, { boxes }] = queryKey;
  return await Promise.all(
    boxes.map(async boxId =>
      (await fetch(`${REST_ENDPOINT}/parameter/box/${boxId}`)).json()
    )
  );
};

export const getParameterOfBox = async ({ queryKey }) => {
  // eslint-disable-next-lineå
  const [_key, { boxId }] = queryKey;
  const res = await fetch(`${REST_ENDPOINT}/parameter/box/${boxId}`);

  return res.json();
};

export const getLiveTours = async () => {
  const res = await fetch(`${REST_ENDPOINT}/tours/live`);

  return res.json();
};
