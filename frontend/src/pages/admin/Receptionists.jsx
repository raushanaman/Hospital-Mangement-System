import { useEffect, useState } from "react";
import { getReceptionists, updateReceptionist, deleteReceptionist } from "../../services/receptionistService";

const SHIFT_STYLES = {
    morning: "bg-yellow-100 text-yellow-700",
    evening: "bg-blue-100 text-blue-700",
    night: "bg-purple-100 text-purple-700",
};

const EditModal = ({ receptionist, onClose, onSave }) => {
    const [form, setForm] = useState({
        employeeId: receptionist.employeeId || "",
        phoneNumber: receptionist.phoneNumber || "",
        shift: receptionist.shift || "morning",
        isActive: receptionist.isActive ?? true,
    });
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        await onSave(receptionist._id, form);
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-5">Edit Receptionist</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Employee ID</label>
                        <input value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Phone Number</label>
                        <input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Shift</label>
                        <select value={form.shift} onChange={(e) => setForm({ ...form, shift: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                            <option value="night">Night</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="isActive" checked={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                            className="w-4 h-4 accent-indigo-600" />
                        <label htmlFor="isActive" className="text-sm text-gray-600">Active</label>
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

const Receptionists = () => {
    const [receptionists, setReceptionists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selected, setSelected] = useState(null);

    const fetchReceptionists = async () => {
        try {
            setLoading(true);
            const res = await getReceptionists();
            setReceptionists(res.data.data || []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch receptionists");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this receptionist?")) return;
        try {
            await deleteReceptionist(id);
            setReceptionists((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete receptionist");
        }
    };

    const handleSave = async (id, data) => {
        try {
            const res = await updateReceptionist(id, data);
            setReceptionists((prev) =>
                prev.map((r) => (r._id === id ? res.data.data : r))
            );
            setSelected(null);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update receptionist");
        }
    };

    useEffect(() => { fetchReceptionists(); }, []);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Receptionists</h1>
                <p className="text-sm text-gray-500 mt-1">{receptionists.length} receptionist{receptionists.length !== 1 ? "s" : ""} registered</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-500 text-sm">{error}</div>
                ) : receptionists.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm">No receptionists found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-gray-100">
                                <tr>
                                    {["Name", "Email", "Employee ID", "Phone", "Shift", "Status", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {receptionists.map((r) => (
                                    <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {r.user?.firstName} {r.user?.lastName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{r.user?.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.employeeId}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.phoneNumber}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${SHIFT_STYLES[r.shift] || "bg-gray-100 text-gray-600"}`}>
                                                {r.shift}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {r.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex gap-4">
                                            <button onClick={() => setSelected(r)}
                                                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(r._id)}
                                                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                                                Delete
                                            </button>
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
                    receptionist={selected}
                    onClose={() => setSelected(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Receptionists;
