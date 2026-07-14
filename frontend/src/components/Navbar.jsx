import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-base font-semibold text-gray-700">
                Hospital Management System
            </h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-sm">
                            {user?.firstName?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                    </div>
                </div>
                <button onClick={logout}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;
