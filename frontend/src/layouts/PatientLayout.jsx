import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PatientSideBar from "../components/PatientSideBar";

const PatientLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <PatientSideBar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default PatientLayout;
