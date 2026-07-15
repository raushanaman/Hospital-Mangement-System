import axiosInstance from "./api/axios";

// admin
export const getPatients = () => axiosInstance.get("/patients");
export const getPatientById = (id) => axiosInstance.get(`/patients/${id}`);
export const createPatient = (data) => axiosInstance.post("/patients", data);
export const updatePatient = (id, data) => axiosInstance.put(`/patients/${id}`, data);
export const deletePatient = (id) => axiosInstance.delete(`/patients/${id}`);

// by patient
export const getDoctors = () => axiosInstance.get("/doctors");
export const getDoctorDetails = (id) => axiosInstance.get(`/doctors/${id}`);
export const getMyAppointments = () => axiosInstance.get("/appointments/my");
export const createAppointment = (data) => axiosInstance.post("/appointments", data);
export const getMyProfile = () => axiosInstance.get("/patients/me");
export const updateMyProfile = (data) => axiosInstance.put("/patients/me", data);
