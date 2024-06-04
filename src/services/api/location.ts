import axios from "./axios";

const getAllLocations = async () => {
  let url = "/location/all";
  const res = await axios.get(url);
  return res;
};

const createLocation = async (formData: any) => {
  return await axios.post("/location/create-location", formData);
};

const updateLocation = async (id: string, formData: any) => {
  return await axios.put(`/location/update-location/${id}`, formData);
};

const deleteLocation = async (id: string) => {
  return await axios.delete(`location/delete-location/${id}`);
};

export const locationService = {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
};
