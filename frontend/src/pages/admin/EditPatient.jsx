import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPatientById, updatePatient } from "../../services/patientService";

const EditPatient = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        gender: "", bloodGroup: "", emergencyContact: "",
        dateOfBirth: "", height: "", weight: "", address: "",
    });
    const [patientName, setPatientName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        getPatientById(id)
            .then((res) => {
                const p = res.data.data;
                setPatientName(`${p.user?.firstName} ${p.user?.lastName}`);
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
            .catch(() => setError("Failed to load patient"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");
        try {
            await updatePatient(id, formData);
            navigate("/patients");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update patient");
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

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => navigate("/patients")} className="text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors">
                    ← Back to Patients
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Edit Patient</h1>
                {patientName && <p className="text-sm text-gray-500 mt-1">{patientName}</p>}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
                )}
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
                        <button type="button" onClick={() => navigate("/patients")}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors text-sm">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPatient;
