import { useEffect, useState } from "react";
import {
    getAppointments,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
} from "../../services/appointmentService";

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

const EditModal = ({ appointment, onClose, onSave }) => {
    const [form, setForm] = useState({
        appointmentDate: appointment.appointmentDate?.split("T")[0] || "",
        startTime: appointment.startTime || "",
        endTime: appointment.endTime || "",
        reason: appointment.reason || "",
        consultationFee: appointment.consultationFee || 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            await onSave(appointment._id, form);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update appointment");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300";

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Edit Appointment</h2>
                {error && <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Date</label>
                        <input type="date" value={form.appointmentDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                            className={inputClass} required />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Start Time</label>
                            <input type="time" value={form.startTime}
                                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                                className={inputClass} required />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">End Time</label>
                            <input type="time" value={form.endTime}
                                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                                className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Reason</label>
                        <textarea value={form.reason} rows={3}
                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                            className={`${inputClass} resize-none`} required />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Consultation Fee (₹)</label>
                        <input type="number" value={form.consultationFee} min={0}
                            onChange={(e) => setForm({ ...form, consultationFee: e.target.value })}
                            className={inputClass} />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={saving}
                            className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50">
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [selected, setSelected] = useState(null);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await getAppointments();
            setAppointments(res.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAppointments(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this appointment?")) return;
        try {
            await deleteAppointment(id);
            setAppointments((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete appointment");
        }
    };

    const handleSave = async (id, data) => {
        const res = await updateAppointment(id, data);
        setAppointments((prev) => prev.map((a) => (a._id === id ? res.data.data : a)));
        setSelected(null);
    };

    const handleStatusChange = async (id, status) => {
        setUpdatingId(id);
        try {
            await updateAppointmentStatus(id, status);
            setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
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
        const matchSearch = !search || doctorName.includes(keyword) || patientName.includes(keyword);
        const matchStatus = !statusFilter || a.status === statusFilter;
        return matchSearch && matchStatus;
    });

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                <p className="text-sm text-gray-500 mt-1">{filtered.length} appointment{filtered.length !== 1 ? "s" : ""}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {/* Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3">
                    <div className="relative flex-1 min-w-[200px]">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search by doctor or patient..." value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
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
                                    {["Patient", "Doctor", "Date", "Time", "Reason", "Fee", "Status", "Change Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((appt) => (
                                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-800">{appt.patient?.user?.firstName} {appt.patient?.user?.lastName}</p>
                                            <p className="text-xs text-gray-400">{appt.patient?.user?.email}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-800">Dr. {appt.doctor?.user?.firstName} {appt.doctor?.user?.lastName}</p>
                                            <p className="text-xs text-gray-400">{appt.doctor?.specialization}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                            {new Date(appt.appointmentDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600 whitespace-nowrap">{appt.startTime} – {appt.endTime}</td>
                                        <td className="px-5 py-4 text-gray-600 max-w-[150px] truncate">{appt.reason}</td>
                                        <td className="px-5 py-4 text-gray-600">₹{appt.consultationFee}</td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[appt.status] || "bg-gray-100 text-gray-600"}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            {ALLOWED_TRANSITIONS[appt.status]?.length > 0 ? (
                                                <select disabled={updatingId === appt._id}
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
                                        <td className="px-5 py-4">
                                            <div className="flex gap-3">
                                                <button onClick={() => setSelected(appt)}
                                                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(appt._id)}
                                                    className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {selected && (
                <EditModal
                    appointment={selected}
                    onClose={() => setSelected(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminAppointments;
