import * as appointRepo from "../repositories/appointment.repository.js";
import * as doctorRepo from "../repositories/doctor.repository.js";
import * as patientRepo from "../repositories/patient.repository.js";

// create appointment

export const createAppointment = async (appointmentData) => {
    const {
        doctor,
        patient,
        appointmentDate,
        startTime,
        endTime,
    } = appointmentData;

    const doctorExist = await doctorRepo.getDoctorById(doctor);

    if (!doctorExist) {
        throw new Error("Doctor not found");
    }

    // check patient exist

    const patientExist = await patientRepo.getPatientById(patient);
    if (!patientExist) {
        throw new Error("Patient not found");
    }

    // exact slot check

    const bookedSlot = await appointRepo.findDoctorAppointmentBySlot(
        doctor,
        appointmentDate,
        startTime,
        endTime
    );
    if (bookedSlot) {
        throw new Error("Doctor is busy in this slot");
    }
    // save appointment

    return await appointRepo.createAppointment(appointmentData);
}

// get All appointments

export const getAllAppointments = async (filter = {}) => {
    return await appointRepo.getAllAppointment(filter);
}

// get appointment by id

export const getAppointmentById = async (appointmentId) => {
    const appointment = await appointRepo.getAppointmentById(appointmentId);
    if (!appointment) {
        throw new Error("Appointment not found");
    }
    return appointment;
}

// update appointment

export const updateAppointment = async (
    appointmentId,
    updateData) => {
    const appointment = await appointRepo.getAppointmentById(appointmentId);

    if (!appointment) {
        throw new Error(
            "Appointment not found"
        );
    }
    const allowedFields = [
        "appointmentDate",
        "startTime",
        "endTime",
        "reason",
        "consultationFee"
    ];

    const filteredData = {};

    Object.keys(updateData).forEach((key)=>{
        if(allowedFields.includes(key)){
            filteredData[key] = updateData[key];
        }
    });
    return await appointRepo.updateAppointment(
        appointmentId,
        filteredData
    );
}

// delete appointment

export const deleteAppointment = async (appointmentId) =>{
    const appointment = await appointRepo.getAppointmentById(appointmentId);

    if(!appointment){
        throw new Error(
            "Appointment not found"
        );
    }
    return await appointRepo.deleteAppointment(appointmentId);


}

// update status

export const updateAppointmentStatus = async(
    appointmentId,
    status
)=>{
    const appointment = await appointment.getAppointmentById(appointmentId);

    if(!appointment){
        throw new Error("Appointment not found");
    }
    return await appointRepo.updateAppointment(
        appointmentId, {status}
    );
}

// get my appointment doctor

export const getDoctorAppointment = async(doctorId)=>{
    return await appointRepo.getAllAppointment({doctor:doctorId});
}

// get my appointment patient 

export const getPatientAppointment = async(patientId)=>{
    return await appointRepo.getAllAppointment({patient:patientId});
}

// extracting doctor id from doctor repo

export const getMyAppointment = async(user)=>{
    //logged in doctor

    if(user.role ==="doctor"){
        const  doctor = await doctorRepo.findDoctorByUserId(user._id);
        if(!doctor) throw new Error("Doctor not found");

        return await appointRepo.getAllAppointment({doctor:doctor._id});   
    }

    if(user.role ===  "patient"){
        const patient = await patientRepo.getPatientByUserId(user._id);

        if(!patient){
            throw new error("patient not found");
        }

        return await appointRepo.getAllAppointment({patient: patient._id})
    }

    if(user.role === "admin" || user.role ==="receptionist"){
        return await appointRepo.getAllAppointment();
    }
}
