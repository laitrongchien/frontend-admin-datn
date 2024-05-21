import axios from "./axios";

const getAllNotifications = async (page: number, limit: number) => {
  return await axios.get(`/notification/all/?page=${page}&limit=${limit}`);
};

const updateReadStatus = async (notificationId: string, isRead: boolean) => {
  return await axios.put(`/notification/update-read-status/${notificationId}`, {
    isRead,
  });
};

const markAllAsRead = async () => {
  return await axios.post("/notification/mark-all-as-read");
};

export const notificationService = {
  getAllNotifications,
  updateReadStatus,
  markAllAsRead,
};
