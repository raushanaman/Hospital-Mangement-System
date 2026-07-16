import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../services/doctorService";
import { getPatients } from "../../services/patientService";
import { createAppointment } from "../../services/appointmentService";

// Reusable searchable dropdown component
const SearchableSelect = ({ label, required, items, value, onSelect, displayFn, searchFn, placeholder }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const selected = items.find((i) => i._id === value);
    const filtered = query
        ? items.filter((i) => searchFn(i, query))
        : items;

    // close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelect = (item) => {
        onSelect(item);
        setQuery("");
        setOpen(false);
    };

    const handleClear = (e) => {
        e.stopPropagation();
        onSelect(null);
        setQuery("");
    };

    return (
        <div ref={ref} className="relative">
            <label className="text-xs font-medium text-gray-500 mb-1 block">
                {label} {required && <span className="text-red-400">*</span>}
            </label>

            {/* Input box */}
            <div
                onClick={() => setOpen(true)}
                className={`flex items-center border rounded-lg px-3 py-2.5 cursor-text bg-white text-sm transition-all ${
                    open ? "border-indigo-400 ring-2 ring-indigo-100" : "border-gray-200"
                }`}
            >
                {!open && selected ? (
                    <span className="flex-1 text-gray-800">{displayFn(selected)}</span>
                ) : (
                    <input
                        autoFocus={open}
                        value={open ? query : ""}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={selected ? displayFn(selected) : placeholder}
                        className="flex-1 outline-none bg-transparent placeholder-gray-400"
                    />
                )}
                {selected && (
                    <button type="button" onClick={handleClear} className="text-gray-400 hover:text-gray-600 ml-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
                <svg className={`w-4 h-4 text-gray-400 ml-1 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                    {filtered.length === 0 ? (
                        <p className="text-sm text-gray-400 px-4 py-3">No results found</p>
                    ) : (
                        filtered.map((item) => (
                            <div
                                key={item._id}
                                onMouseDown={() => handleSelect(item)}
                                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-indigo-50 transition-colors ${
                                    value === item._id ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-700"
                                }`}
                            >
                                {displayFn(item)}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

const CreateAppointment = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        doctor: "", patient: "", appointmentDate: "",
        startTime: "", endTime: "", reason: "", consultationFee: "",
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

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor);
        setForm((prev) => ({
            ...prev,
            doctor: doctor?._id || "",
            consultationFee: doctor?.consultationFee || "",
        }));
    };

    const handlePatientSelect = (patient) => {
        setForm((prev) => ({ ...prev, patient: patient?._id || "" }));
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

                    {/* Doctor searchable */}
                    <SearchableSelect
                        label="Doctor"
                        required
                        items={doctors.filter((d) => d.availability)}
                        value={form.doctor}
                        onSelect={handleDoctorSelect}
                        placeholder="Search doctor by name or specialization..."
                        displayFn={(d) => `Dr. ${d.user?.firstName} ${d.user?.lastName} — ${d.specialization}`}
                        searchFn={(d, q) => {
                            const name = `${d.user?.firstName} ${d.user?.lastName}`.toLowerCase();
                            return name.includes(q.toLowerCase()) || d.specialization?.toLowerCase().includes(q.toLowerCase());
                        }}
                    />

                    {/* Doctor info hint */}
                    {selectedDoctor && (
                        <div className="bg-indigo-50 rounded-xl px-4 py-3 text-xs text-indigo-700 space-y-1">
                            <p>Working Hours: <span className="font-medium">{selectedDoctor.startTime} – {selectedDoctor.endTime}</span></p>
                            <p>Working Days: <span className="font-medium">{selectedDoctor.workingDays?.join(", ") || "—"}</span></p>
                        </div>
                    )}

                    {/* Patient searchable */}
                    <SearchableSelect
                        label="Patient"
                        required
                        items={patients}
                        value={form.patient}
                        onSelect={handlePatientSelect}
                        placeholder="Search patient by name or email..."
                        displayFn={(p) => `${p.user?.firstName} ${p.user?.lastName} — ${p.user?.email}`}
                        searchFn={(p, q) => {
                            const name = `${p.user?.firstName} ${p.user?.lastName}`.toLowerCase();
                            return name.includes(q.toLowerCase()) || p.user?.email?.toLowerCase().includes(q.toLowerCase());
                        }}
                    />

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

                    <button type="submit" disabled={submitting || !form.doctor || !form.patient}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                        {submitting ? "Creating..." : "Create Appointment"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAppointment;
