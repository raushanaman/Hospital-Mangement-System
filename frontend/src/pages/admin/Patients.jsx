import { useEffect, useState } from "react";
import {getPatients, deletePatient} from "..//..//services/patientService";




const Patients = () => {


    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchPatients = async ()=>{

        try {
            
            setLoading(true);
    
            const res = await getPatients();
            setPatients(res.data.data);


        } catch (error) {

            setError(err.res?.data?.message || "Failed to  fetch patients");

            
        }finally{
            setLoading(false);
        }
    };

    const handleDelete =async(id)=>{
        const confirmDelete = window.confirm("Delete this  patient?");
        if(!confirmDelete) return ;
        try {
            await deletePatient(id);
            setPatients(prev =>
                prev.filter(
                    patient => patient._id !== id
                )
            )
        } catch (error) {
            alert(error.response?.data?.message);
        }
    }
    useEffect(()=>{
        fetchPatients();
    },[]);

    if(loading) return <h1>Loading...</h1>;
    if(error) return <h1>{error}</h1>;




    return (
         <div className="bg-white p-6 rounded-xl shadow">

      <h1
      className="text-2xl font-bold mb-6"
      >
        Patients
      </h1>

      <table className="w-full">

        <thead>

          <tr>

            <th>Name</th>

            <th>Gender</th>

            <th>Blood Group</th>

            <th>Emergency</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {
            patients.map(patient => (

              <tr key={patient._id}>

                <td>
                  {patient.user?.name}
                </td>

                <td>
                  {patient.gender}
                </td>

                <td>
                  {patient.bloodGroup}
                </td>

                <td>
                  {patient.emergencyContact}
                </td>

                <td>

                  <button
                  className="mr-2"
                  >
                    Edit
                  </button>

                  <button
                  onClick={() =>
                    handleDelete(
                      patient._id
                    )
                  }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>
    )
};

export default Patients;
