import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../services/patientService";

const ReceptionistPatients = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getPatients();
                setPatients(res.data.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch patients");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
    );

    if (error) return <div className="text-center py-20 text-red-500 text-sm">{error}</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                    <p className="text-sm text-gray-500 mt-1">{patients.length} patient{patients.length !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => navigate("/receptionist/patients/create")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
                    + Add Patient
                </button>
            </div>

            {patients.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-sm">No patients found</div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {["Name", "Email", "Gender", "Blood Group", "Emergency Contact"].map(h => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {patients.map(patient => (
                                <tr key={patient._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 font-medium text-gray-800">
                                        {patient.user?.firstName} {patient.user?.lastName}
                                    </td>
                                    <td className="px-5 py-4 text-gray-500">{patient.user?.email}</td>
                                    <td className="px-5 py-4 text-gray-600 capitalize">{patient.gender}</td>
                                    <td className="px-5 py-4 text-gray-600">{patient.bloodGroup}</td>
                                    <td className="px-5 py-4 text-gray-600">{patient.emergencyContact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReceptionistPatients;
