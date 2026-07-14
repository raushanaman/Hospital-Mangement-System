import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../../services/doctorService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DoctorProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getMyProfile();
                setProfile(res.data.data);
                setFormData({
                    specialization: res.data.data.specialization || "",
                    department: res.data.data.department || "",
                    experience: res.data.data.experience || "",
                    consultationFee: res.data.data.consultationFee || "",
                    availability: res.data.data.availability ?? true,
                    workingDays: res.data.data.workingDays || [],
                    startTime: res.data.data.startTime || "09:00",
                    endTime: res.data.data.endTime || "18:00",
                });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const toggleDay = (day) => {
        setFormData((prev) => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter((d) => d !== day)
                : [...prev.workingDays, day],
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            const res = await updateMyProfile(formData);
            setProfile(res.data.data);
            setEditing(false);
            setSuccess("Profile updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error && !profile) return <div className="text-red-500 text-sm">{error}</div>;

    const doctor = profile;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your professional information</p>
                </div>
                {!editing ? (
                    <button onClick={() => setEditing(true)}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button onClick={handleSave} disabled={saving}
                            className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60">
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                        <button onClick={() => setEditing(false)}
                            className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-4">
                    {success}
                </div>
            )}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {/* Header */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-100 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-2xl">
                            {doctor?.user?.firstName?.charAt(0)?.toUpperCase() || "D"}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            Dr. {doctor?.user?.firstName} {doctor?.user?.lastName}
                        </h2>
                        <p className="text-sm text-gray-500">{doctor?.user?.email}</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                            doctor?.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                            {doctor?.availability ? "Available" : "Unavailable"}
                        </span>
                    </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { label: "Specialization", name: "specialization", type: "text" },
                        { label: "Department", name: "department", type: "text" },
                        { label: "Experience (years)", name: "experience", type: "number" },
                        { label: "Consultation Fee (₹)", name: "consultationFee", type: "number" },
                        { label: "Start Time", name: "startTime", type: "time" },
                        { label: "End Time", name: "endTime", type: "time" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <p className="text-xs text-gray-400 mb-1">{label}</p>
                            {editing ? (
                                <input type={type} name={name} value={formData[name]} onChange={handleChange} min="0"
                                    className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                            ) : (
                                <p className="font-medium text-gray-700 text-sm">
                                    {name === "consultationFee" ? `₹${doctor?.[name]}` : doctor?.[name]}
                                    {name === "experience" ? " yrs" : ""}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Availability toggle (edit mode) */}
                {editing && (
                    <div className="flex items-center gap-3 mt-6">
                        <p className="text-xs text-gray-400">Availability</p>
                        <button type="button" onClick={() => setFormData((p) => ({ ...p, availability: !p.availability }))}
                            className={`relative w-10 h-5 rounded-full transition-colors ${formData.availability ? "bg-green-500" : "bg-gray-300"}`}>
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.availability ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                        <span className={`text-xs font-medium ${formData.availability ? "text-green-600" : "text-gray-400"}`}>
                            {formData.availability ? "Available" : "Unavailable"}
                        </span>
                    </div>
                )}

                {/* Working Days */}
                <div className="mt-6">
                    <p className="text-xs text-gray-400 mb-2">Working Days</p>
                    {editing ? (
                        <div className="flex flex-wrap gap-2">
                            {DAYS.map((day) => (
                                <button key={day} type="button" onClick={() => toggleDay(day)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                                        formData.workingDays.includes(day)
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}>
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {doctor?.workingDays?.length > 0
                                ? doctor.workingDays.map((d) => (
                                    <span key={d} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-full">{d}</span>
                                ))
                                : <span className="text-gray-400 text-sm">Not set</span>
                            }
                        </div>
                    )}
                </div>

                {/* License */}
                <div className="mt-6">
                    <p className="text-xs text-gray-400 mb-1">License Number</p>
                    <p className="font-medium text-gray-700 text-sm">{doctor?.licenseNumber}</p>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
