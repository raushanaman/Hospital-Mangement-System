import { useState, useEffect } from "react";
import { getMyAppointments } from "../../services/patientService";

const STATUS_STYLES = {
    pending: "bg-amber-100 text-amber-700",
    confirmed: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const PatientAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await getMyAppointments();
                setAppointments(res.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {appointments.length} appointment{appointments.length !== 1 ? "s" : ""}
                </p>
            </div>

            {appointments.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm">No appointments found</div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Doctor</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Date</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Time</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Reason</th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {appointments.map((appt) => (
                                <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <p className="font-medium text-gray-800">
                                            Dr. {appt.doctor?.user?.firstName} {appt.doctor?.user?.lastName}
                                        </p>
                                        <p className="text-xs text-gray-400">{appt.doctor?.specialization}</p>
                                    </td>
                                    <td className="px-5 py-4 text-gray-600">
                                        {new Date(appt.appointmentDate).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-5 py-4 text-gray-600">
                                        {appt.startTime} – {appt.endTime}
                                    </td>
                                    <td className="px-5 py-4 text-gray-600 max-w-xs truncate">
                                        {appt.reason}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                                            STATUS_STYLES[appt.status] || "bg-gray-100 text-gray-600"
                                        }`}>
                                            {appt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PatientAppointments;
