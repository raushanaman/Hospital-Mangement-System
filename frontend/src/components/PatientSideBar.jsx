import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const navItems = [
    { to: "/patient/dashboard", label: "Dashboard" },
    { to: "/patient/doctors", label: "Doctors" },
    { to: "/patient/appointments", label: "My Appointments" },
    { to: "/patient/profile", label: "Profile" },
];

const PatientSideBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
            <div className="p-5 border-b border-gray-100">
                <p className="font-bold text-gray-800 text-sm">HMS</p>
                <p className="text-xs text-gray-400">Patient Panel</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-700 truncate">
                    {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
        </aside>
    );
};

export default PatientSideBar;
