import axios from "./axios";

const getAllMotorbikeRentals = async () => {
  let url = "/rental/get-all-rentals";
  const res = await axios.get(url);
  return res;
};

const getMotorbikeRentalById = async (id: string) => {
  return await axios.get(`/rental/get-rental-detail/${id}`);
};

const updateRentalStatus = async (id: string, status: string) => {
  return await axios.put(`/rental/update-rental-status/${id}`, {
    status,
  });
};

const updateIdentificationsRental = async (
  id: string,
  identifications: string[]
) => {
  return await axios.put(`rental/update-identifications-rental/${id}`, {
    identifications,
  });
};

export const rentalService = {
  getAllMotorbikeRentals,
  getMotorbikeRentalById,
  updateRentalStatus,
  updateIdentificationsRental,
};
