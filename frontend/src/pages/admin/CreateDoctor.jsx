import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerUser, deleteUser } from "../../services/authService";
import { createDoctor } from "../../services/doctorService";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const CreateDoctor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        gender: "male",
        specialization: "",
        department: "",
        experience: "",
        consultationFee: "",
        licenseNumber: "",
        workingDays: [],
        startTime: "",
        endTime: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Frontend validation — API call se pehle sab check karo
        if (!formData.licenseNumber.trim()) {
            setError("License number is required");
            return;
        }
        if (!formData.startTime || !formData.endTime) {
            setError("Start time and end time are required");
            return;
        }
        if (!formData.experience || Number(formData.experience) < 0) {
            setError("Valid experience is required");
            return;
        }
        if (!formData.consultationFee || Number(formData.consultationFee) < 0) {
            setError("Valid consultation fee is required");
            return;
        }

        setLoading(true);
        setError("");
        let userId = null;

        try {
            // Step 1: User register karo
            const userRes = await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                gender: formData.gender,
                role: "doctor",
            });

            userId = userRes.data.data._id;

            // Step 2: Doctor profile banao
            await createDoctor({
                user: userId,
                specialization: formData.specialization,
                department: formData.department,
                experience: Number(formData.experience),
                consultationFee: Number(formData.consultationFee),
                licenseNumber: formData.licenseNumber.trim(),
                workingDays: formData.workingDays,
                startTime: formData.startTime,
                endTime: formData.endTime,
            });

            navigate("/doctors");
        } catch (err) {
            // Step 2 fail hua — Step 1 ka user rollback karo
            if (userId) {
                try { await deleteUser(userId); } catch (_) {}
            }
            setError(err.response?.data?.message || "Failed to create doctor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-6">
                <button onClick={() => navigate("/doctors")}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Doctors
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Add New Doctor</h1>
                <p className="text-sm text-gray-500 mt-1">Fill in personal and professional details</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    <p className="text-sm font-semibold text-gray-700">Personal Information</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">First Name</label>
                            <input type="text" name="firstName" placeholder="Rahul" value={formData.firstName}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Last Name</label>
                            <input type="text" name="lastName" placeholder="Sharma" value={formData.lastName}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Email</label>
                            <input type="email" name="email" placeholder="doctor@hms.com" value={formData.email}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Password</label>
                            <input type="password" name="password" placeholder="Min 6 characters" value={formData.password}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Phone</label>
                            <input type="text" name="phone" placeholder="9876543210" value={formData.phone}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <p className="text-sm font-semibold text-gray-700">Professional Information</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Specialization</label>
                            <input type="text" name="specialization" placeholder="e.g. Cardiology" value={formData.specialization}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Department</label>
                            <input type="text" name="department" placeholder="e.g. Cardiology Dept." value={formData.department}
                                onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Experience (years)</label>
                            <input type="number" name="experience" placeholder="0" value={formData.experience}
                                onChange={handleChange} required min="0"
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Consultation Fee (₹)</label>
                            <input type="number" name="consultationFee" placeholder="500" value={formData.consultationFee}
                                onChange={handleChange} required min="0"
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Start Time</label>
                            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">End Time</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">License Number</label>
                        <input type="text" name="licenseNumber" placeholder="e.g. MCI-12345" value={formData.licenseNumber}
                            onChange={handleChange} required
                            className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-2 block">Working Days</label>
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
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button type="submit" disabled={loading}
                            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-60">
                            {loading ? "Creating..." : "Create Doctor"}
                        </button>
                        <button type="button" onClick={() => navigate("/doctors")}
                            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDoctor;
