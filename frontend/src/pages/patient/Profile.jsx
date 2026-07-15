import { useState, useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../../services/patientService";

const Field = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="text-sm font-medium text-gray-700 capitalize">{value || "—"}</p>
    </div>
);

const PatientProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({
        gender: "", bloodGroup: "", emergencyContact: "",
        dateOfBirth: "", height: "", weight: "", address: "",
    });

    useEffect(() => {
        getMyProfile()
            .then((res) => {
                const p = res.data.data;
                setProfile(p);
                setFormData({
                    gender: p.gender || "",
                    bloodGroup: p.bloodGroup || "",
                    emergencyContact: p.emergencyContact || "",
                    dateOfBirth: p.dateOfBirth ? p.dateOfBirth.split("T")[0] : "",
                    height: p.height || "",
                    weight: p.weight || "",
                    address: p.address || "",
                });
            })
            .catch((err) => setError(err.response?.data?.message || "Failed to load profile"))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");
        try {
            const res = await updateMyProfile(formData);
            setProfile(res.data.data);
            setSuccess("Profile updated successfully!");
            setEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300";

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error && !profile) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

    const { user } = profile;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                {!editing && (
                    <button onClick={() => { setEditing(true); setSuccess(""); }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                {/* Avatar + name */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-bold text-xl">
                            {user?.firstName?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>
                </div>

                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm">{success}</div>
                )}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
                )}

                {!editing ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                        <Field label="Gender" value={profile.gender} />
                        <Field label="Blood Group" value={profile.bloodGroup} />
                        <Field label="Height" value={profile.height ? `${profile.height} cm` : null} />
                        <Field label="Weight" value={profile.weight ? `${profile.weight} kg` : null} />
                        <Field label="Emergency Contact" value={profile.emergencyContact} />
                        <Field label="Address" value={profile.address} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}>
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Blood Group</label>
                                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className={inputClass}>
                                    <option value="">Select blood group</option>
                                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                            </div>
                            {[
                                { name: "emergencyContact", label: "Emergency Contact", type: "text" },
                                { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                                { name: "height", label: "Height (cm)", type: "number" },
                                { name: "weight", label: "Weight (kg)", type: "number" },
                            ].map(({ name, label, type }) => (
                                <div key={name}>
                                    <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                                    <input type={type} name={name} value={formData[name]}
                                        onChange={handleChange} className={inputClass} />
                                </div>
                            ))}
                            <div className="sm:col-span-2">
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Address</label>
                                <input type="text" name="address" value={formData.address}
                                    onChange={handleChange} className={inputClass} />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button type="submit" disabled={saving}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" onClick={() => { setEditing(false); setError(""); }}
                                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PatientProfile;
