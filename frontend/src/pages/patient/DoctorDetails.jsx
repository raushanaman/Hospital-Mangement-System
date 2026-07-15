import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorDetails, createAppointment, getMyProfile } from "../../services/patientService";

const DoctorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [patientProfile, setPatientProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        appointmentDate: "",
        startTime: "",
        endTime: "",
        reason: "",
    });

    useEffect(() => {
        const load = async () => {
            try {
                const [docRes, profileRes] = await Promise.allSettled([
                    getDoctorDetails(id),
                    getMyProfile(),
                ]);
                if (docRes.status === "fulfilled") setDoctor(docRes.value.data.data);
                if (profileRes.status === "fulfilled") setPatientProfile(profileRes.value.data.data);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleBook = async (e) => {
        e.preventDefault();
        if (!patientProfile) {
            setError("Patient profile not found. Please contact admin.");
            return;
        }
        setSubmitting(true);
        setError("");
        setSuccess("");
        try {
            await createAppointment({
                doctor: id,
                patient: patientProfile._id,
                ...form,
            });
            setSuccess("Appointment booked successfully!");
            setForm({ appointmentDate: "", startTime: "", endTime: "", reason: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to book appointment");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (!doctor) return <div className="text-center py-20 text-red-500 text-sm">Doctor not found</div>;

    return (
        <div>
            <button
                onClick={() => navigate("/patient/doctors")}
                className="text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors"
            >
                ← Back to Doctors
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Doctor Info Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-600 font-bold text-xl">
                                {doctor.user?.firstName?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                            </h1>
                            <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        {[
                            { label: "Department", value: doctor.department },
                            { label: "Experience", value: `${doctor.experience} years` },
                            { label: "Consultation Fee", value: `₹${doctor.consultationFee}` },
                            { label: "Working Hours", value: `${doctor.startTime} – ${doctor.endTime}` },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between py-2 border-b border-gray-50">
                                <span className="text-gray-400">{label}</span>
                                <span className="font-medium text-gray-700">{value}</span>
                            </div>
                        ))}

                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-400">Status</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                doctor.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                                {doctor.availability ? "Available" : "Unavailable"}
                            </span>
                        </div>

                        <div className="py-2">
                            <p className="text-gray-400 mb-2">Working Days</p>
                            <div className="flex flex-wrap gap-1">
                                {doctor.workingDays?.map((d) => (
                                    <span key={d} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-0.5 rounded-full">
                                        {d}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Book Appointment Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-5">Book Appointment</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-4 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleBook} className="space-y-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Appointment Date</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                value={form.appointmentDate}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split("T")[0]}
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">Start Time <span className="text-red-400">*</span></label>
                                <input
                                    type="time"
                                    name="startTime"
                                    value={form.startTime}
                                    onChange={handleChange}
                                    required
                                    className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-gray-500 mb-1 block">End Time <span className="text-gray-400">(optional)</span></label>
                                <input
                                    type="time"
                                    name="endTime"
                                    value={form.endTime}
                                    onChange={handleChange}
                                    className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Reason for Visit</label>
                            <textarea
                                name="reason"
                                value={form.reason}
                                onChange={handleChange}
                                required
                                rows={3}
                                placeholder="Describe your symptoms or reason..."
                                className="border border-gray-200 rounded-lg p-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting || !doctor.availability}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                        >
                            {submitting ? "Booking..." : "Book Appointment"}
                        </button>

                        {!doctor.availability && (
                            <p className="text-xs text-red-500 text-center">This doctor is currently unavailable</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorDetails;
