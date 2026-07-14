import { useEffect, useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const EditDoctorModal = ({ doctor, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        specialization: "",
        department: "",
        experience: "",
        consultationFee: "",
        availability: true,
        workingDays: [],
        startTime: "09:00",
        endTime: "18:00",
    });

    useEffect(() => {
        if (doctor) {
            setFormData({
                specialization: doctor.specialization || "",
                department: doctor.department || "",
                experience: doctor.experience || "",
                consultationFee: doctor.consultationFee || "",
                availability: doctor.availability ?? true,
                workingDays: doctor.workingDays || [],
                startTime: doctor.startTime || "09:00",
                endTime: doctor.endTime || "18:00",
            });
        }
    }, [doctor]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const toggleDay = (day) => {
        setFormData((prev) => ({
            ...prev,
            workingDays: prev.workingDays.includes(day)
                ? prev.workingDays.filter((d) => d !== day)
                : [...prev.workingDays, day],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(doctor._id, formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">Edit Doctor</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Specialization</label>
                            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Department</label>
                            <input type="text" name="department" value={formData.department} onChange={handleChange}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Experience (yrs)</label>
                            <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0"
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Consultation Fee (₹)</label>
                            <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} min="0"
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Start Time</label>
                            <input type="time" name="startTime" value={formData.startTime} onChange={handleChange}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">End Time</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={handleChange}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-2 block">Working Days</label>
                        <div className="flex flex-wrap gap-2">
                            {DAYS.map((day) => (
                                <button key={day} type="button" onClick={() => toggleDay(day)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                        formData.workingDays.includes(day)
                                            ? "bg-indigo-600 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}>
                                    {day.slice(0, 3)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-xs font-medium text-gray-500">Available</label>
                        <button type="button" onClick={() => setFormData((p) => ({ ...p, availability: !p.availability }))}
                            className={`relative w-10 h-5 rounded-full transition-colors ${formData.availability ? "bg-green-500" : "bg-gray-300"}`}>
                            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${formData.availability ? "translate-x-5" : "translate-x-0.5"}`} />
                        </button>
                        <span className={`text-xs font-medium ${formData.availability ? "text-green-600" : "text-gray-400"}`}>
                            {formData.availability ? "Available" : "Unavailable"}
                        </span>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="submit"
                            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                            Save Changes
                        </button>
                        <button type="button" onClick={onClose}
                            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDoctorModal;
