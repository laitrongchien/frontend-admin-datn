import axios from "./axios";

const getAllTours = async () => {
  let url = "/tour/all";
  const res = await axios.get(url);
  return res;
};

const createTour = async (formData: any) => {
  return await axios.post("/tour/create-tour", formData);
};

const updateTour = async (id: string, formData: any) => {
  return await axios.put(`/tour/update-tour/${id}`, formData);
};

const deleteTour = async (id: string) => {
  return await axios.delete(`tour/delete-tour/${id}`);
};

const getTourById = async (id: string) => {
  return await axios.get(`/tour/get-tour/${id}`);
};

const uploadTourCoverImage = async (file: any) => {
  const formData = new FormData();
  if (file) formData.append("imageCover", file);
  const res = await axios.post("/tour/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.secure_url;
};

export const tourService = {
  getAllTours,
  getTourById,
  uploadTourCoverImage,
  createTour,
  updateTour,
  deleteTour,
};
