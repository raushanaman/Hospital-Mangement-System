import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors } from "../../services/patientService";

const PatientDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await getDoctors();
                setDoctors(res.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load doctors");
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} available
                </p>
            </div>

            {doctors.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm">No doctors found</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            onClick={() => navigate(`/patient/doctors/${doctor._id}`)}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-indigo-600 font-bold text-sm">
                                        {doctor.user?.firstName?.charAt(0)?.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 text-sm">
                                        Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400">{doctor.specialization}</p>
                                </div>
                            </div>

                            <div className="space-y-1.5 text-xs text-gray-500">
                                <p>Department: <span className="text-gray-700 font-medium">{doctor.department}</span></p>
                                <p>Experience: <span className="text-gray-700 font-medium">{doctor.experience} yrs</span></p>
                                <p>Fee: <span className="text-gray-700 font-medium">₹{doctor.consultationFee}</span></p>
                                <p>Hours: <span className="text-gray-700 font-medium">{doctor.startTime} – {doctor.endTime}</span></p>
                            </div>

                            <div className="mt-3">
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    doctor.availability
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {doctor.availability ? "Available" : "Unavailable"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientDoctors;
