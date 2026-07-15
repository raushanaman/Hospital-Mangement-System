import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getMyProfile } from "../../services/receptionistService";
import { getAppointments } from "../../services/appointmentService";
import { getPatients } from "../../services/patientService";

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

const ReceptionistDashboard = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [appointmentCount, setAppointmentCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            const [profileRes, apptRes, patientRes] = await Promise.allSettled([
                getMyProfile(),
                getAppointments(),
                getPatients(),
            ]);
            if (profileRes.status === "fulfilled") setProfile(profileRes.value.data.data);
            if (apptRes.status === "fulfilled") setAppointmentCount(apptRes.value.data.data?.length || 0);
            if (patientRes.status === "fulfilled") setPatientCount(patientRes.value.data.data?.length || 0);
        };
        load();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}! 👋</h1>
                <p className="text-gray-500 mt-1">Here's your overview for today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard label="Total Appointments" value={appointmentCount}
                    icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    color="bg-indigo-500" />
                <StatCard label="Total Patients" value={patientCount}
                    icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    color="bg-emerald-500" />
                <StatCard label="Shift"
                    value={profile ? profile.shift.charAt(0).toUpperCase() + profile.shift.slice(1) : "—"}
                    icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="bg-amber-500" />
            </div>

            {profile && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">My Details</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Employee ID</p>
                            <p className="font-medium text-gray-700">{profile.employeeId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Phone</p>
                            <p className="font-medium text-gray-700">{profile.phoneNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Joining Date</p>
                            <p className="font-medium text-gray-700">
                                {new Date(profile.joiningDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {profile.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceptionistDashboard;
