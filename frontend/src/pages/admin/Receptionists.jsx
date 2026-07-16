import { useEffect, useState } from "react";
import {
    getReceptionists,
    createReceptionist,
    deleteReceptionist,
    registerReceptionistUser,
} from "../../services/receptionistService";
import { maxDobDate, validateDob } from "../../utils/dobValidation";

const INITIAL_USER = { firstName: "", lastName: "", email: "", password: "", phone: "", gender: "", dateOfBirth: "" };
const INITIAL_PROFILE = { user: "", employeeId: "", phoneNumber: "", shift: "morning" };

const Receptionists = () => {
    const [receptionists, setReceptionists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    // step 1 = register user, step 2 = create profile
    const [step, setStep] = useState(1);
    const [userData, setUserData] = useState(INITIAL_USER);
    const [profileData, setProfileData] = useState(INITIAL_PROFILE);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [dobError, setDobError] = useState("");

    const fetchReceptionists = async () => {
        try {
            setLoading(true);
            const res = await getReceptionists();
            setReceptionists(res.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch receptionists");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchReceptionists(); }, []);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        if (name === "dateOfBirth") setDobError(validateDob(value));
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    // Step 1 — register user with role receptionist
    const handleStep1 = async (e) => {
        e.preventDefault();
        if (dobError) return;
        setFormError("");
        setSubmitting(true);
        try {
            const res = await registerReceptionistUser({ ...userData, role: "receptionist" });
            const userId = res.data.data._id;
            setProfileData((prev) => ({ ...prev, user: userId, phoneNumber: userData.phone }));
            setStep(2);
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to register user");
        } finally {
            setSubmitting(false);
        }
    };

    // Step 2 — create receptionist profile
    const handleStep2 = async (e) => {
        e.preventDefault();
        setFormError("");
        setSubmitting(true);
        try {
            await createReceptionist(profileData);
            setShowModal(false);
            setStep(1);
            setUserData(INITIAL_USER);
            setProfileData(INITIAL_PROFILE);
            fetchReceptionists();
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to create receptionist profile");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this receptionist?")) return;
        try {
            await deleteReceptionist(id);
            setReceptionists((prev) => prev.filter((r) => r._id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setStep(1);
        setUserData(INITIAL_USER);
        setProfileData(INITIAL_PROFILE);
        setFormError("");
        setDobError("");
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Receptionists</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage all receptionists</p>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Receptionist
                </button>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
            ) : receptionists.length === 0 ? (
                <div className="text-center py-20 text-gray-400">No receptionists found</div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {["Name", "Employee ID", "Phone", "Shift", "Status", "Actions"].map((h) => (
                                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {receptionists.map((r) => (
                                <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold text-sm">
                                                    {r.user?.firstName?.charAt(0)?.toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm">{r.user?.firstName} {r.user?.lastName}</p>
                                                <p className="text-xs text-gray-400">{r.user?.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{r.employeeId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{r.phoneNumber}</td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                            {r.shift}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {r.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(r._id)}
                                            className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Add Receptionist</h2>
                                <p className="text-xs text-gray-400 mt-0.5">Step {step} of 2 — {step === 1 ? "User Account" : "Profile Details"}</p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Step indicators */}
                        <div className="flex px-6 pt-4 gap-2">
                            {[1, 2].map((s) => (
                                <div key={s} className={`flex-1 h-1.5 rounded-full ${step >= s ? "bg-indigo-600" : "bg-gray-200"}`} />
                            ))}
                        </div>

                        {formError && (
                            <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                                {formError}
                            </div>
                        )}

                        {/* Step 1 — User Registration */}
                        {step === 1 && (
                            <form onSubmit={handleStep1} className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                                        <input type="text" name="firstName" value={userData.firstName} onChange={handleUserChange} required placeholder="John"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                                        <input type="text" name="lastName" value={userData.lastName} onChange={handleUserChange} required placeholder="Doe"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                    <input type="email" name="email" value={userData.email} onChange={handleUserChange} required placeholder="john@hospital.com"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                                    <input type="password" name="password" value={userData.password} onChange={handleUserChange} required placeholder="Min 6 characters"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="text" name="phone" value={userData.phone} onChange={handleUserChange} required placeholder="9876543210"
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                                        <select name="gender" value={userData.gender} onChange={handleUserChange} required
                                            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input type="date" name="dateOfBirth" value={userData.dateOfBirth}
                                        onChange={handleUserChange} max={maxDobDate}
                                        className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                                            dobError ? "border-red-400 focus:ring-red-300" : "border-gray-200 focus:ring-indigo-500"
                                        }`} />
                                    {dobError && <p className="text-red-500 text-xs mt-1">{dobError}</p>}
                                </div>
                                <button type="submit" disabled={submitting || !!dobError}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                                    {submitting ? "Registering..." : "Next →"}
                                </button>
                            </form>
                        )}

                        {/* Step 2 — Receptionist Profile */}
                        {step === 2 && (
                            <form onSubmit={handleStep2} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Employee ID</label>
                                    <input type="text" name="employeeId" value={profileData.employeeId} onChange={handleProfileChange} required placeholder="EMP001"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="text" name="phoneNumber" value={profileData.phoneNumber} onChange={handleProfileChange} required placeholder="9876543210"
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Shift</label>
                                    <select name="shift" value={profileData.shift} onChange={handleProfileChange} required
                                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                                        <option value="morning">Morning</option>
                                        <option value="evening">Evening</option>
                                        <option value="night">Night</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <button type="button" onClick={() => setStep(1)}
                                        className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-2.5 rounded-xl text-sm transition-colors">
                                        ← Back
                                    </button>
                                    <button type="submit" disabled={submitting}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                                        {submitting ? "Creating..." : "Create"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Receptionists;
