import axiosInstance from "./api/axios";

export const login = (credentials) => axiosInstance.post("/auth/login", credentials);
export const register = (data) => axiosInstance.post("/auth/register", data);
export const deleteUser = (id) => axiosInstance.delete(`/users/${id}`);
