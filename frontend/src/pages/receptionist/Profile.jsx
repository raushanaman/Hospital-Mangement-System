import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../../services/receptionistService";

const ReceptionistProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ phoneNumber: "", address: "" });

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getMyProfile();
                setProfile(res.data.data);
                setForm({
                    phoneNumber: res.data.data.phoneNumber || "",
                    address: res.data.data.address || "",
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateMyProfile(form);
            setProfile(res.data.data);
            setEditing(false);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

    return (
        <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                {!editing && (
                    <button onClick={() => setEditing(true)}
                        className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-2xl">
                            {profile?.user?.firstName?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-800">{profile?.user?.firstName} {profile?.user?.lastName}</p>
                        <p className="text-sm text-gray-500">{profile?.user?.email}</p>
                    </div>
                </div>

                {editing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Phone Number</label>
                            <input value={form.phoneNumber}
                                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Address</label>
                            <textarea value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                rows={3}
                                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="button" onClick={() => setEditing(false)}
                                className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2 rounded-xl hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" disabled={saving}
                                className="flex-1 bg-indigo-600 text-white text-sm font-medium py-2 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Employee ID</p>
                            <p className="font-medium text-gray-700">{profile?.employeeId}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Phone</p>
                            <p className="font-medium text-gray-700">{profile?.phoneNumber || "—"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Shift</p>
                            <p className="font-medium text-gray-700 capitalize">{profile?.shift}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Joining Date</p>
                            <p className="font-medium text-gray-700">
                                {new Date(profile?.joiningDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Status</p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${profile?.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {profile?.isActive ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Address</p>
                            <p className="font-medium text-gray-700">{profile?.address || "—"}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceptionistProfile;
