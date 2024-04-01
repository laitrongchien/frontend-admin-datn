import axios from "./axios";

const getAllMotorbikeIdentifications = async () => {
  let url = "/identification/all";
  const res = await axios.get(url);
  return res;
};


export const motorIdentificationService = {
  getAllMotorbikeIdentifications,
};
