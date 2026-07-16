import axiosInstance from "./api/axios";

export const getReceptionists = () => axiosInstance.get("/receptionist");
export const getReceptionistById = (id) => axiosInstance.get(`/receptionist/${id}`);
export const createReceptionist = (data) => axiosInstance.post("/receptionist", data);
export const updateReceptionist = (id, data) => axiosInstance.put(`/receptionist/${id}`, data);
export const deleteReceptionist = (id) => axiosInstance.delete(`/receptionist/${id}`);
export const getMyProfile = () => axiosInstance.get("/receptionist/me");
export const updateMyProfile = (data) => axiosInstance.put("/receptionist/me", data);
export const registerReceptionistUser = (data) => axiosInstance.post("/auth/register", data);
