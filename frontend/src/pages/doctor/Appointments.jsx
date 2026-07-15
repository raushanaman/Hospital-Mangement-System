import { useEffect, useState } from "react";
import { getMyAppointments, updateAppointmentStatus } from "../../services/appointmentService";

const STATUS_STYLES = {
    scheduled: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-indigo-100 text-indigo-700",
};

const ALLOWED_TRANSITIONS = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    cancelled: [],
    completed: [],
};

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getMyAppointments();
                setAppointments(res.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load appointments");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleStatusChange = async (apptId, newStatus) => {
        setUpdatingId(apptId);
        try {
            await updateAppointmentStatus(apptId, newStatus);
            setAppointments((prev) =>
                prev.map((a) => (a._id === apptId ? { ...a, status: newStatus } : a))
            );
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-sm text-gray-500 mt-1">{appointments.length} appointment{appointments.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-500 text-sm">{error}</div>
                ) : appointments.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm">No appointments found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reason</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {appointments.map((appt) => (
                                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-emerald-600 font-semibold text-xs">
                                                        {appt.patient?.user?.firstName?.charAt(0)?.toUpperCase() || "P"}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {appt.patient?.user?.firstName} {appt.patient?.user?.lastName}
                                                    </p>
                                                    <p className="text-xs text-gray-400">{appt.patient?.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(appt.appointmentDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{appt.startTime} – {appt.endTime}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{appt.reason || "—"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                                STATUS_STYLES[appt.status] || "bg-gray-100 text-gray-600"
                                            }`}>
                                                {appt.status || "unknown"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ALLOWED_TRANSITIONS[appt.status]?.length > 0 ? (
                                                <select
                                                    disabled={updatingId === appt._id}
                                                    onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                                                    defaultValue=""
                                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50"
                                                >
                                                    <option value="" disabled>Change</option>
                                                    {ALLOWED_TRANSITIONS[appt.status].map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorAppointments;
