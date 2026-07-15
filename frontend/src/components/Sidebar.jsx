import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const adminNav = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/doctors", label: "Doctors" },
    { to: "/patients", label: "Patients" },
    { to: "/appointments", label: "Appointments" },
    { to: "/receptionists", label: "Receptionists" },
];

const receptionistNav = [
    { to: "/receptionist/dashboard", label: "Dashboard" },
    { to: "/receptionist/appointments", label: "Appointments" },
    { to: "/receptionist/patients", label: "Patients" },
    { to: "/receptionist/profile", label: "My Profile" },
];

const doctorNav = [
    { to: "/doctor/dashboard", label: "Dashboard" },
    { to: "/doctor/appointments", label: "Appointments" },
    { to: "/doctor/profile", label: "My Profile" },
];

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    const navItems = user?.role === "doctor" ? doctorNav : user?.role === "receptionist" ? receptionistNav : adminNav;

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 text-sm">HMS</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role} Panel</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink key={item.to} to={item.to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
