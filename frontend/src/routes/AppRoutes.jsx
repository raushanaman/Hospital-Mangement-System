import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";
import ReceptionistLayout from "../layouts/ReceptionistLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import AdminAppointments from "../pages/admin/Appointments";
import CreateDoctor from "../pages/admin/CreateDoctor";
import Receptionists from "../pages/admin/Receptionists";

import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorProfile from "../pages/doctor/Profile";
import DoctorAppointments from "../pages/doctor/Appointments";

import CreatePatient from "../pages/admin/CreatePatient";
import EditPatient from "../pages/admin/EditPatient";

import PatientDashboard from "../pages/patient/Dashboard";
import PatientDoctors from "../pages/patient/Doctors";
import DoctorDetails from "../pages/patient/DoctorDetails";
import PatientAppointments from "../pages/patient/Appointments";
import PatientProfile from "../pages/patient/Profile";

import ReceptionistDashboard from "../pages/receptionist/Dashboard";
import ReceptionistAppointments from "../pages/receptionist/Appointments";
import ReceptionistProfile from "../pages/receptionist/Profile";
import ReceptionistPatients from "../pages/receptionist/Patients";
import CreateAppointment from "../pages/receptionist/CreateAppointment";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route element={
                <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminLayout />
                </ProtectedRoute>
            }>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/create-doctor" element={<CreateDoctor />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/patients/create" element={<CreatePatient/>}/>
                <Route path="/patients/:id/edit" element={<EditPatient/>}/>
                <Route path="/appointments" element={<AdminAppointments />} />
                <Route path="/receptionists" element={<Receptionists />} />
            </Route>

            {/* Receptionist Routes */}
            <Route element={
                <ProtectedRoute allowedRoles={["receptionist"]}>
                    <ReceptionistLayout />
                </ProtectedRoute>
            }>
                <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
                <Route path="/receptionist/appointments" element={<ReceptionistAppointments />} />
                <Route path="/receptionist/appointments/create" element={<CreateAppointment />} />
                <Route path="/receptionist/patients" element={<ReceptionistPatients />} />
                <Route path="/receptionist/patients/create" element={<CreatePatient />} />
                <Route path="/receptionist/profile" element={<ReceptionistProfile />} />
            </Route>

            {/* Patient Routes */}
            <Route element={
                <ProtectedRoute allowedRoles={["patient"]}>
                    <PatientLayout />
                </ProtectedRoute>
            }>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/doctors" element={<PatientDoctors />} />
                <Route path="/patient/doctors/:id" element={<DoctorDetails />} />
                <Route path="/patient/appointments" element={<PatientAppointments />} />
                <Route path="/patient/profile" element={<PatientProfile />} />
            </Route>

            {/* Doctor Routes */}
            <Route element={
                <ProtectedRoute allowedRoles={["doctor"]}>
                    <DoctorLayout />
                </ProtectedRoute>
            }>
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/profile" element={<DoctorProfile />} />
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
