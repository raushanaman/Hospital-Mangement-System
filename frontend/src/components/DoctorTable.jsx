import DoctorRow from "./DoctorRow";

const DoctorTable = ({ doctors, onDelete, onEdit }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-100">
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Specialization</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Experience</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {doctors.map((doctor) => (
                        <DoctorRow
                            key={doctor._id}
                            doctor={doctor}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorTable;
