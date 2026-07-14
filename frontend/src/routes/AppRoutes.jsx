import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import AdminAppointments from "../pages/admin/Appointments";
import CreateDoctor from "../pages/admin/CreateDoctor";

import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorProfile from "../pages/doctor/Profile";
import DoctorAppointments from "../pages/doctor/Appointments";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

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
                <Route path="/appointments" element={<AdminAppointments />} />
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
