import axiosInstance from "./api/axios";

export const getDoctors = () => axiosInstance.get("/doctors");
export const getDoctorById = (id) => axiosInstance.get(`/doctors/${id}`);
export const createDoctor = (data) => axiosInstance.post("/doctors", data);
export const updateDoctor = (id, data) => axiosInstance.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) => axiosInstance.delete(`/doctors/${id}`);
export const searchDoctors = (name) => axiosInstance.get(`/doctors/search?name=${name}`);
export const getMyProfile = () => axiosInstance.get("/doctors/me");
export const updateMyProfile = (data) => axiosInstance.put("/doctors/me", data);
