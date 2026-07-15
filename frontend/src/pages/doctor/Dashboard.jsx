import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getMyProfile } from "../../services/doctorService";
import { getMyAppointments } from "../../services/appointmentService";

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

const DoctorDashboard = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [appointmentCount, setAppointmentCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                const [profileRes, apptRes] = await Promise.allSettled([getMyProfile(), getMyAppointments()]);
                if (profileRes.status === "fulfilled") setProfile(profileRes.value.data.data);
                if (apptRes.status === "fulfilled") setAppointmentCount(apptRes.value.data.data?.length || 0);
            } catch (_) {}
        };
        load();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, Dr. {user?.firstName}! 👋</h1>
                <p className="text-gray-500 mt-1">Here's your overview for today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard label="Appointments" value={appointmentCount}
                    icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    color="bg-indigo-500" />
                <StatCard label="Experience" value={profile ? `${profile.experience} yrs` : "—"}
                    icon="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    color="bg-emerald-500" />
                <StatCard label="Consultation Fee" value={profile ? `₹${profile.consultationFee}` : "—"}
                    icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    color="bg-amber-500" />
            </div>

            {profile && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">My Details</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Specialization</p>
                            <p className="font-medium text-gray-700">{profile.specialization}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Department</p>
                            <p className="font-medium text-gray-700">{profile.department}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Working Hours</p>
                            <p className="font-medium text-gray-700">{profile.startTime} – {profile.endTime}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                profile.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                                {profile.availability ? "Available" : "Unavailable"}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs text-gray-400 mb-1">Working Days</p>
                            <div className="flex flex-wrap gap-1">
                                {profile.workingDays?.length > 0
                                    ? profile.workingDays.map((d) => (
                                        <span key={d} className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full">{d}</span>
                                    ))
                                    : <span className="text-gray-400">Not set</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
