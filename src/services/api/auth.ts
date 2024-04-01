import axios from "./axios";
import { setUser } from "@/utils/storage";

const login = async (formData: any) => {
  return await axios.post("/auth/login", formData);
};

const logout = async () => {
  return await axios.get("/auth/logout");
};

const refreshToken = async () => {
  try {
    const res = await axios.get("/auth/refresh_token");
    setUser(res.data);
    return res.data.access_token;
  } catch (err) {
    console.error("Error refreshing token:", err);
  }
};

export const authService = {
  login,
  logout,
  refreshToken,
};
