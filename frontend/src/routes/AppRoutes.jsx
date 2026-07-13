import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Doctors from "../pages/Doctors";
import Patients from "../pages/Patients";
import Appointments from "../pages/Appointments";
import ProtectedRoute from "./protectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard"
                element={
                    <ProtectedRoute>

                        <Dashboard />
                    </ProtectedRoute>
                } />


            <Route path="/doctors"
                element={
                    <ProtectedRoute
                    allowedRoles ={["admin"]}
                    >
                        <Doctors />
                    </ProtectedRoute>} />


            <Route path="/patients"
                element={
                    <ProtectedRoute
                    allowedRoles={["admin","receptionist"]}
                    >
                        <Patients />
                    </ProtectedRoute>} />


            <Route path="/appointments"
                element={
                    <ProtectedRoute
                    allowedRoles={["admin", "doctor", "patient", "receptionist"]}
                    >
                        <Appointments />
                    </ProtectedRoute>} />


        </Routes>
    )
}

export default AppRoutes;
