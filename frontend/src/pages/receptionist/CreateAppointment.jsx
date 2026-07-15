import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../services/doctorService";
import { getPatients } from "../../services/patientService";
import { createAppointment } from "../../services/appointmentService";

const CreateAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        doctor: "",
        patient: "",
        appointmentDate: "",
        startTime: "",
        endTime: "",
        reason: "",
        consultationFee: "",
    });

    useEffect(() => {
        const load = async () => {
            try {
                const [docRes, patRes] = await Promise.all([getDoctors(), getPatients()]);
                setDoctors(docRes.data.data || []);
                setPatients(patRes.data.data || []);
            } catch {
                setError("Failed to load doctors or patients");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        const doctor = doctors.find((d) => d._id === doctorId);
        setSelectedDoctor(doctor || null);
        setForm((prev) => ({ ...prev, doctor: doctorId, consultationFee: doctor?.consultationFee || "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        try {
            await createAppointment({
                doctor: form.doctor,
                patient: form.patient,
                appointmentDate: form.appointmentDate,
                startTime: form.startTime,
                ...(form.endTime && { endTime: form.endTime }),
                reason: form.reason,
                ...(form.consultationFee && { consultationFee: Number(form.consultationFee) }),
            });
            navigate("/receptionist/appointments");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create appointment");
        } finally {
            setSubmitting(false);
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
                <button onClick={() => navigate("/receptionist/appointments")}
                    className="text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors">
                    ← Back to Appointments
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Create Appointment</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 max-w-2xl">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Doctor */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Doctor <span className="text-red-400">*</span></label>
                        <select value={form.doctor} onChange={handleDoctorChange} required className={inputClass}>
                            <option value="">Select doctor</option>
                            {doctors.filter((d) => d.availability).map((d) => (
                                <option key={d._id} value={d._id}>
                                    Dr. {d.user?.firstName} {d.user?.lastName} — {d.specialization}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Doctor info hint */}
                    {selectedDoctor && (
                        <div className="bg-indigo-50 rounded-xl px-4 py-3 text-xs text-indigo-700 space-y-1">
                            <p>Working Hours: <span className="font-medium">{selectedDoctor.startTime} – {selectedDoctor.endTime}</span></p>
                            <p>Working Days: <span className="font-medium">{selectedDoctor.workingDays?.join(", ") || "—"}</span></p>
                        </div>
                    )}

                    {/* Patient */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Patient <span className="text-red-400">*</span></label>
                        <select value={form.patient} onChange={(e) => setForm({ ...form, patient: e.target.value })} required className={inputClass}>
                            <option value="">Select patient</option>
                            {patients.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.user?.firstName} {p.user?.lastName} — {p.user?.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Appointment Date <span className="text-red-400">*</span></label>
                        <input type="date" value={form.appointmentDate}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                            required className={inputClass} />
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">Start Time <span className="text-red-400">*</span></label>
                            <input type="time" value={form.startTime}
                                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                                required className={inputClass} />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-gray-500 mb-1 block">End Time <span className="text-gray-400">(optional)</span></label>
                            <input type="time" value={form.endTime}
                                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                                className={inputClass} />
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Reason <span className="text-red-400">*</span></label>
                        <textarea value={form.reason} rows={3}
                            onChange={(e) => setForm({ ...form, reason: e.target.value })}
                            placeholder="Describe the reason for visit..."
                            required className={`${inputClass} resize-none`} />
                    </div>

                    {/* Consultation Fee */}
                    <div>
                        <label className="text-xs font-medium text-gray-500 mb-1 block">Consultation Fee (₹)</label>
                        <input type="number" value={form.consultationFee} min={0}
                            onChange={(e) => setForm({ ...form, consultationFee: e.target.value })}
                            className={inputClass} />
                    </div>

                    <button type="submit" disabled={submitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                        {submitting ? "Creating..." : "Create Appointment"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAppointment;
