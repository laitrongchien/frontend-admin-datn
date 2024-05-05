import axios from "./axios";

const createRepairMotorbike = async (createRepairMotorbikeData: any) => {
  return await axios.post("/repair/create-repair", createRepairMotorbikeData);
};

const updateRepairMotorbike = async (
  id: string,
  updateRepairMotorbikeData: any
) => {
  return await axios.put(
    `repair/update-repair/${id}`,
    updateRepairMotorbikeData
  );
};

const getAllRepairs = async () => {
  return await axios.get("/repair/get-all-repairs");
};

export const repairService = {
  createRepairMotorbike,
  getAllRepairs,
  updateRepairMotorbike,
};
