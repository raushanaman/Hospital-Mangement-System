import axiosInstance from "./api/axios";

export const getReceptionists = () => axiosInstance.get("/receptionists");
export const getReceptionistById = (id) => axiosInstance.get(`/receptionists/${id}`);
export const createReceptionist = (data) => axiosInstance.post("/receptionists", data);
export const updateReceptionist = (id, data) => axiosInstance.put(`/receptionists/${id}`, data);
export const deleteReceptionist = (id) => axiosInstance.delete(`/receptionists/${id}`);
