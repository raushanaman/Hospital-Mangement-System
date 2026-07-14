import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, token } = useContext(AuthContext);

    if (!token) return <Navigate to="/" />;

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role))
        return <Navigate to={user?.role === "doctor" ? "/doctor/dashboard" : "/dashboard"} />;

    return children;
};

export default ProtectedRoute;
