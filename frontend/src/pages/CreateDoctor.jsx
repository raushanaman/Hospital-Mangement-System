import { useState } from "react";
import axiosInstance from "../api/axios";

const CreateDoctor = () => {
    const [formData, setFormData] = useState({
        user: "",
        specialization: "",
        experience: "",
        consultationFee: "",
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setMessage("");

            const response = await axiosInstance.post("/api/doctors", formData);
            setMessage("Doctor created successfully");
        } catch (error) {
            setMessage(error.response?.data?.message ||
                "failed  to create doctor"
            );
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 max-w-lg mx-auto">

            <h1 className="text-3xl font-bold mb-6">Create Doctor</h1>

            <form onSubmit={handleSubmit}
                className="space-y-4"
            >

                <input type="text"
                    name="user"
                    placeholder="User Id"
                    value={formData.user}
                    onChange={handleChange}
                    className="border p-3 w-full"
                />

                <input type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="border p-3 w-full"
                />

                <input type="number"
                    name="experience"
                    placeholder="Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="border p-3 w-full"
                />

                <input type="text"
                    name="consultationFee"
                    placeholder="Consultation Fee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    className="border p-3 w-full"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="border px-4 py-2"
                >{loading ? "Creating..." : "Create Doctor"}</button>
            </form>

            {
                message && (
                    <p className="mt-4">
                        {message}
                    </p>
                )
            }


        </div>
    )
}

export default CreateDoctor;