import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getMyAppointments, getMyProfile } from "../../services/patientService";

const StatCard = ({ label, value, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
);

const PatientDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [apptRes, profileRes] = await Promise.allSettled([
                    getMyAppointments(),
                    getMyProfile(),
                ]);
                if (apptRes.status === "fulfilled") setAppointments(apptRes.value.data.data || []);
                if (profileRes.status === "fulfilled") setProfile(profileRes.value.data.data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const pending = appointments.filter((a) => a.status === "pending").length;
    const confirmed = appointments.filter((a) => a.status === "confirmed").length;
    const completed = appointments.filter((a) => a.status === "completed").length;

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.firstName}! 👋</h1>
                <p className="text-gray-500 mt-1">Here's your health overview.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <StatCard label="Pending" value={pending} color="text-amber-500" />
                <StatCard label="Confirmed" value={confirmed} color="text-indigo-600" />
                <StatCard label="Completed" value={completed} color="text-emerald-600" />
            </div>

            {profile && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">My Profile</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        {[
                            { label: "Blood Group", value: profile.bloodGroup },
                            { label: "Gender", value: profile.gender },
                            { label: "Emergency Contact", value: profile.emergencyContact },
                            { label: "Height", value: profile.height ? `${profile.height} cm` : null },
                            { label: "Weight", value: profile.weight ? `${profile.weight} kg` : null },
                            { label: "Address", value: profile.address },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <p className="text-xs text-gray-400 mb-1">{label}</p>
                                <p className="font-medium text-gray-700 capitalize">{value || "—"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={() => navigate("/patient/doctors")}
                    className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:shadow-md hover:border-indigo-200 transition-all"
                >
                    <p className="font-semibold text-gray-800">Browse Doctors</p>
                    <p className="text-sm text-gray-500 mt-1">Find and book an appointment</p>
                </button>
                <button
                    onClick={() => navigate("/patient/appointments")}
                    className="bg-white border border-gray-100 rounded-2xl p-6 text-left hover:shadow-md hover:border-indigo-200 transition-all"
                >
                    <p className="font-semibold text-gray-800">My Appointments</p>
                    <p className="text-sm text-gray-500 mt-1">View all your appointments</p>
                </button>
            </div>
        </div>
    );
};

export default PatientDashboard;
