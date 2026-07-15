import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import PatientLayout from "../layouts/PatientLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import AdminAppointments from "../pages/admin/Appointments";
import CreateDoctor from "../pages/admin/CreateDoctor";

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

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin & Receptionist Routes */}
            <Route element={
                <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
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
