import * as appointRepo from "../repositories/appointment.repository.js";
import * as doctorRepo from "../repositories/doctor.repository.js";
import * as patientRepo from "../repositories/patient.repository.js";


// helper  function for duration validation
const convertTimeToMinutes = (time)=>{
    const [hours, minutes]= time.split(":");
    return Number(hours) *60 + Number(minutes);
}

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

    const startMinutes = convertTimeToMinutes(startTime);
    const endMinutes = convertTimeToMinutes(endTime);

    if (!doctorExist) {
        throw new Error("Doctor not found");
    }

    const doctorStartMinutes = convertTimeToMinutes(doctorExist.startTime);
    const doctorEndMinutes = convertTimeToMinutes(doctorExist.endTime);

    // doctor working hour check

    if(startMinutes < doctorStartMinutes || endMinutes > doctorEndMinutes){
        throw new Error("Appointment time is outside of doctor's working hours");
    }
    // check patient exist


    const patientExist = await patientRepo.getPatientById(patient);
    if (!patientExist) {
        throw new Error("Patient not found");
    }


    if(endMinutes <= startMinutes) {
        throw new Error("end time must be greater than start time")
    }

    const duration = endMinutes - startMinutes;
    if(duration < 30){
        throw new Error("Minimum appointment duration is 30 minutes");
    }

   const existingAppointments = await appointRepo.findDoctorAppointmentByDate(
    doctor,
    appointmentDate
   );
   for(const appointment of existingAppointments){
    const existingStart = convertTimeToMinutes(appointment.startMinutes);
    const existingEnd = convertTimeToMinutes(appointment.endTime);

    if(startMinutes < existingEnd && endMinutes > existingStart){
        throw new Error("Doctor has an overlapping appointment at this time");
    }
   }
    // save appointment

    return await appointRepo.createAppointment(appointmentData);

}

// get All appointments

export const getAllAppointments = async ({
    page = 1,
    limit = 10,
    status,
    sort = "latest",
    search
}) => {
    const filter = {};

    if (status) {
        filter.status = status;
    }

    const appointments = await appointRepo.searchAppointment(
        filter,
        Number(page),
        Number(limit),
        sort
    );

    if (!search) {
        return appointments;
    }

    const keyword = search.toLowerCase();

    const filtered = appointments.filter((appointment) => {
        const doctorFirstName = appointment?.doctor?.user?.firstName?.toLowerCase() || "";
        const doctorLastName = appointment?.doctor?.user?.lastName?.toLowerCase() || "";
        const patientFirstName = appointment?.patient?.user?.firstName?.toLowerCase() || "";
        const patientLastName = appointment?.patient?.user?.lastName?.toLowerCase() || "";

        return (
            doctorFirstName.includes(keyword) ||
            doctorLastName.includes(keyword) ||
            patientFirstName.includes(keyword) ||
            patientLastName.includes(keyword)
        );
    });

    if (!filtered.length) {
        throw new Error(`No appointments found for "${search}"`);
    }

    return filtered;
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
    const appointment = await appointRepo.getAppointmentById(appointmentId);

    if(!appointment){
        throw new Error("Appointment not found");
    }

    const allowedTransition = {
        pending: ["confirmed", "cancelled"],
        confirmed: ["completed", "cancelled"],
        cancelled: [],
        completed: []
    };
    const currentStatus = appointment.status;

    if(!allowedTransition[currentStatus].includes(status)){
        throw new Error(`Cannot change status from ${currentStatus} to ${status}`)
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

export const getMyAppointments = async(user)=>{
    //logged in doctor

    if(user.role ==="doctor"){
        const  doctor = await doctorRepo.findDoctorByUserId(user._id);
        if(!doctor) throw new Error("Doctor not found");

        return await appointRepo.getAllAppointment({doctor:doctor._id});   
    }

    if(user.role ===  "patient"){
        const patient = await patientRepo.getPatientByUserId(user._id);

        if(!patient){
            throw new Error("patient not found");
        }

        return await appointRepo.getAllAppointment({patient: patient._id})
    }

    if(user.role === "admin" || user.role ==="receptionist"){
        return await appointRepo.getAllAppointment();
    }
}
