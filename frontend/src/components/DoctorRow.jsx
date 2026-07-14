const DoctorRow = ({ doctor, onDelete, onEdit }) => {
    const name = doctor.user
        ? `${doctor.user.firstName} ${doctor.user.lastName}`
        : "N/A";

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-indigo-600 font-semibold text-sm">
                            {doctor.user?.firstName?.charAt(0)?.toUpperCase() || "D"}
                        </span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-800 text-sm">{name}</p>
                        <p className="text-xs text-gray-400">{doctor.user?.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{doctor.specialization}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{doctor.department}</td>
            <td className="px-6 py-4 text-sm text-gray-600">{doctor.experience} yrs</td>
            <td className="px-6 py-4 text-sm text-gray-600">₹{doctor.consultationFee}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doctor.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                    {doctor.availability ? "Available" : "Unavailable"}
                </span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(doctor)}
                        className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        Edit
                    </button>
                    <button onClick={() => onDelete(doctor._id)}
                        className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default DoctorRow;
