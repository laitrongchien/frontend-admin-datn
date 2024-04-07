import axios from "./axios";

const getAllMotorbikeIdentifications = async () => {
  let url = "/identification/all";
  const res = await axios.get(url);
  return res;
};

const updateMotorIdentification = async (updateData: any) => {
  return await axios.put(
    "/identification/update-motor-identification",
    updateData
  );
};

export const motorIdentificationService = {
  getAllMotorbikeIdentifications,
  updateMotorIdentification,
};
