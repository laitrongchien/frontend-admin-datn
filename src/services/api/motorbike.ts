import axios from "./axios";

const getAllMotorbikes = async () => {
  let url = "/motorbike/all";
  const res = await axios.get(url);
  return res;
};

const createMotorbike = async (formData: any) => {
  return await axios.post("/motorbike/create-motorbike", formData);
};

const updateMotorbike = async (id: string, formData: any) => {
  return await axios.put(`/motorbike/update-motorbike/${id}`, formData);
};

const deleteMotorbike = async (id: string) => {
  return await axios.delete(`motorbike/delete-motorbike/${id}`);
};

const uploadMotorbikeImage = async (file: any) => {
  const formData = new FormData();
  if (file) formData.append("image", file);
  const res = await axios.post("/motorbike/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.secure_url;
};

const getMotorbikeById = async (id: string) => {
  return await axios.get(`/motorbike/get-motorbike/${id}`);
};

export const motorbikeService = {
  getAllMotorbikes,
  getMotorbikeById,
  createMotorbike,
  updateMotorbike,
  deleteMotorbike,
  uploadMotorbikeImage,
};
