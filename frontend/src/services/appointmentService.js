import axiosInstance from "./api/axios";

export const getAppointments = () => axiosInstance.get("/appointments");
export const getMyAppointments = () => axiosInstance.get("/appointments/my");
export const getAppointmentById = (id) => axiosInstance.get(`/appointments/${id}`);
export const createAppointment = (data) => axiosInstance.post("/appointments", data);
export const updateAppointment = (id, data) => axiosInstance.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => axiosInstance.delete(`/appointments/${id}`);
export const updateAppointmentStatus = (id, status) => axiosInstance.patch(`/appointments/${id}/status`, { status });
