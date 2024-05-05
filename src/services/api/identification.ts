import axios from "./axios";

const getAllMotorbikeIdentifications = async () => {
  let url = "/identification/all";
  const res = await axios.get(url);
  return res;
};

const getMotorByIdentification = async (identification: string) => {
  return await axios.get(
    `/identification/get-motor-by-identification/${identification}`
  );
};

const createMotorIdentification = async (createData: any) => {
  return await axios.post(
    "/identification/create-motor-identification",
    createData
  );
};

const importMotorIdentification = async (importData: any) => {
  return await axios.post(
    "/identification/import-motor-identification",
    importData
  );
};

const updateMotorIdentification = async (updateData: any) => {
  return await axios.put(
    "/identification/update-motor-identification",
    updateData
  );
};

const deleteMotorIdentification = async (id: string) => {
  return await axios.delete(`identification/delete-motor-identification/${id}`);
};

const getAllAvailableMotor = async (motorbikeId: string) => {
  return await axios.get(
    `/identification/get-all-available-motor/${motorbikeId}`
  );
};

export const motorIdentificationService = {
  getAllMotorbikeIdentifications,
  createMotorIdentification,
  importMotorIdentification,
  updateMotorIdentification,
  deleteMotorIdentification,
  getMotorByIdentification,
  getAllAvailableMotor,
};
