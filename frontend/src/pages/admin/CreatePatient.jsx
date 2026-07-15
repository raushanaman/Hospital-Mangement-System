import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register, deleteUser } from "../../services/authService";
import { createPatient } from "../../services/patientService";
import { AuthContext } from "../../context/AuthContext";

const CreatePatient = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const backPath = user?.role === "receptionist" ? "/receptionist/patients" : "/patients";
    const successPath = user?.role === "receptionist" ? "/receptionist/patients" : "/patients";
    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "",
        phone: "", gender: "", bloodGroup: "", emergencyContact: "",
        dateOfBirth: "", height: "", weight: "", address: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            // Step 1: create user account with role=patient
            const userRes = await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                gender: formData.gender,
                role: "patient",
            });

            const userId = userRes.data.data?._id || userRes.data._id;

            // Step 2: create patient profile — rollback user if this fails
            try {
                await createPatient({
                    user: userId,
                    gender: formData.gender,
                    bloodGroup: formData.bloodGroup,
                    emergencyContact: formData.emergencyContact,
                    dateOfBirth: formData.dateOfBirth,
                    ...(formData.height && { height: formData.height }),
                    ...(formData.weight && { weight: formData.weight }),
                    ...(formData.address && { address: formData.address }),
                });
            } catch (patientErr) {
                await deleteUser(userId).catch(() => {});
                throw patientErr;
            }

            navigate(successPath);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create patient");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300";

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => navigate(backPath)} className="text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors">
                    ← Back to Patients
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Create Patient</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Account Info</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { name: "firstName", label: "First Name", type: "text" },
                            { name: "lastName", label: "Last Name", type: "text" },
                            { name: "email", label: "Email", type: "email" },
                            { name: "password", label: "Password", type: "password" },
                            { name: "phone", label: "Phone", type: "text" },
                            { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                        ].map(({ name, label, type }) => (
                            <div key={name}>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                                <input type={type} name={name} value={formData[name]} onChange={handleChange}
                                    required className={inputClass} />
                            </div>
                        ))}
                    </div>

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide pt-2">Medical Info</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} required className={inputClass}>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Blood Group</label>
                            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className={inputClass}>
                                <option value="">Select blood group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                    <option key={bg} value={bg}>{bg}</option>
                                ))}
                            </select>
                        </div>
                        {[
                            { name: "emergencyContact", label: "Emergency Contact", type: "text", required: true },
                            { name: "address", label: "Address", type: "text", required: false },
                            { name: "height", label: "Height (cm)", type: "number", required: false },
                            { name: "weight", label: "Weight (kg)", type: "number", required: false },
                        ].map(({ name, label, type, required }) => (
                            <div key={name}>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">{label}</label>
                                <input type={type} name={name} value={formData[name]} onChange={handleChange}
                                    required={required} className={inputClass} />
                            </div>
                        ))}
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                        {loading ? "Creating..." : "Create Patient"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePatient;
