import { useEffect, useState } from "react";
import { getAppointments, updateAppointmentStatus } from "../../services/appointmentService";

const STATUS_STYLES = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-indigo-100 text-indigo-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const ALLOWED_TRANSITIONS = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    cancelled: [],
    completed: [],
};

const ReceptionistAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getAppointments();
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

    const filtered = appointments.filter((a) => {
        const keyword = search.toLowerCase();
        const doctorName = `${a.doctor?.user?.firstName} ${a.doctor?.user?.lastName}`.toLowerCase();
        const patientName = `${a.patient?.user?.firstName} ${a.patient?.user?.lastName}`.toLowerCase();
        return doctorName.includes(keyword) || patientName.includes(keyword);
    });

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                    <p className="text-sm text-gray-500 mt-1">{filtered.length} appointment{filtered.length !== 1 ? "s" : ""}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search by doctor or patient..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-500 text-sm">{error}</div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm">No appointments found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100">
                                <tr>
                                    {["Patient", "Doctor", "Date", "Time", "Reason", "Status", "Action"].map((h) => (
                                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((appt) => (
                                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {appt.patient?.user?.firstName} {appt.patient?.user?.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            Dr. {appt.doctor?.user?.firstName} {appt.doctor?.user?.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(appt.appointmentDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{appt.startTime} – {appt.endTime}</td>
                                        <td className="px-6 py-4 text-gray-600 max-w-[160px] truncate">{appt.reason || "—"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[appt.status] || "bg-gray-100 text-gray-600"}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ALLOWED_TRANSITIONS[appt.status]?.length > 0 ? (
                                                <select
                                                    disabled={updatingId === appt._id}
                                                    onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                                                    defaultValue=""
                                                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50">
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

export default ReceptionistAppointments;
