import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getDoctors } from "../../services/doctorService";
import { getPatients } from "../../services/patientService";
import { getAppointments } from "../../services/appointmentService";

const StatCard = ({ label, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
            </svg>
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [d, p, a] = await Promise.allSettled([getDoctors(), getPatients(), getAppointments()]);
                setStats({
                    doctors: d.status === "fulfilled" ? d.value.data.data?.length || 0 : 0,
                    patients: p.status === "fulfilled" ? p.value.data.data?.length || 0 : 0,
                    appointments: a.status === "fulfilled" ? a.value.data.data?.length || 0 : 0,
                });
            } catch (_) {}
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.firstName}! 👋
                </h1>
                <p className="text-gray-500 mt-1">Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard label="Total Doctors" value={stats.doctors}
                    icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    color="bg-indigo-500" />
                <StatCard label="Total Patients" value={stats.patients}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    color="bg-emerald-500" />
                <StatCard label="Appointments" value={stats.appointments}
                    icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    color="bg-amber-500" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => navigate("/doctors")}
                    className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:shadow-md hover:border-indigo-200 transition-all group">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <p className="font-semibold text-gray-800">Manage Doctors</p>
                    <p className="text-sm text-gray-500 mt-1">View, edit and delete doctors</p>
                </button>

                <button onClick={() => navigate("/create-doctor")}
                    className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:shadow-md hover:border-indigo-200 transition-all group">
                    <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="font-semibold text-gray-800">Add New Doctor</p>
                    <p className="text-sm text-gray-500 mt-1">Create a new doctor profile</p>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
