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
