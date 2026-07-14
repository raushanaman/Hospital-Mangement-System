import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, updateDoctor, deleteDoctor, searchDoctors } from "../../services/doctorService";
import EditDoctorModal from "../../components/EditDoctorModal";
import DoctorTable from "../../components/DoctorTable";

const Doctors = () => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await getDoctors();
            setDoctors(response.data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch doctors");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (!query.trim()) return fetchDoctors();
        try {
            setSearching(true);
            const res = await searchDoctors(query);
            setDoctors(res.data.data);
        } catch {
            setDoctors([]);
        } finally {
            setSearching(false);
        }
    };

    const handleDelete = async (doctorId) => {
        if (!window.confirm("Are you sure you want to delete this doctor?")) return;
        try {
            await deleteDoctor(doctorId);
            setDoctors((prev) => prev.filter((d) => d._id !== doctorId));
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete doctor");
        }
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    const handleSave = async (doctorId, updateData) => {
        try {
            const res = await updateDoctor(doctorId, updateData);
            setDoctors((prev) =>
                prev.map((d) => (d._id === doctorId ? { ...d, ...res.data.data } : d))
            );
            setIsModalOpen(false);
            setSelectedDoctor(null);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update doctor");
        }
    };

    useEffect(() => { fetchDoctors(); }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
                    <p className="text-sm text-gray-500 mt-1">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""} registered</p>
                </div>
                <button onClick={() => navigate("/create-doctor")}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Doctor
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-sm">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search by name..." value={searchQuery} onChange={handleSearch}
                            className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                </div>

                {loading || searching ? (
                    <div className="flex items-center justify-center py-16">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16 text-red-500 text-sm">{error}</div>
                ) : doctors.length === 0 ? (
                    <div className="text-center py-16 text-gray-400 text-sm">No doctors found</div>
                ) : (
                    <DoctorTable doctors={doctors} onDelete={handleDelete} onEdit={handleEdit} />
                )}
            </div>

            <EditDoctorModal
                doctor={selectedDoctor}
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setSelectedDoctor(null); }}
                onSave={handleSave}
            />
        </div>
    );
};

export default Doctors;
