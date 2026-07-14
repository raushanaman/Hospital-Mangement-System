import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DoctorLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DoctorLayout;
