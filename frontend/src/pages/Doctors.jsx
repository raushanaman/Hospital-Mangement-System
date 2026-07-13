import { useEffect, useState } from "react";
import axiosInstance from "../api/axios";


const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDoctor = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await axiosInstance.get("/api/doctors");
            setDoctors(response.data.data);
        } catch (error) {

            setError(error.response?.data?.message || "failed to fetch doctors");

        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDoctor();

    }, []);

    if (loading) {
        return (
            <h2>
                Loding Doctors...
            </h2>
        );
    }
    if (error) {
        return (
            <h2>
                {error}
            </h2>
        );
    }
    return (
        <div className="p-6">

            <h1 className="text-3xl font-bold mb-6">
                Doctor list
            </h1>
            {
                doctors.length ===0 ?(
                    <h2>No doctor found</h2>
                ):(
                    <table className="w-full-border">
                        <thead>
                            <tr>
                                <th className="border p-3">
                                    ID
                                </th>
                                <th className="border p-3">specialization</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                doctors.map((doctor)=>{
                                    <tr key={doctor._id}>

                                        <td className="border p-3">{doctor._id}</td>
                                        <td className="border p-3">{doctor.specialization}</td>

                                    </tr>
                                    
                                })
                            }
                        </tbody>

                    </table>
                )
            }


        </div>
    )
}
export default Doctors;