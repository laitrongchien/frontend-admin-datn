import axios from "./axios";

const getAllTourBookings = async () => {
  let url = "/booking/all";
  const res = await axios.get(url);
  return res;
};

const getTourBookingById = async (id: string) => {
  return await axios.get(`/booking/get-booking-tour/${id}`);
};

const updateTourBookingStatus = async (id: string, status: string) => {
  return await axios.put(`/booking/update-booking-tour-status/${id}`, {
    status,
  });
};

export const bookingService = {
  getAllTourBookings,
  getTourBookingById,
  updateTourBookingStatus,
};
