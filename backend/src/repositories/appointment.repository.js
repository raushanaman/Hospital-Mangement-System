import Appointment from "../models/appointment.model.js";

// create appointment

export const createAppointment =async (appointmentData)=>{
    return await Appointment.create(appointmentData);
}

// get all appointments

export const getAllAppointment = async (filter = {})=>{
    return await Appointment.find(filter)
    .populate("doctor")
    .populate("patient")
    .populate("createdBy","-password");
};

// get appointment by id

export const getAppointmentById = async (appointmentId)=>{
    return await Appointment.findById(appointmentId)
    .populate("doctor")
    .populate("patient")
    .populate("createdBy", "-password");
};

// find one appointment

export const findOneAppointment = async (filter)=>{
    return await Appointment.findOne(filter);
}

// update appointment

export const updateAppointment =async (appointmentId, updateData)=>{
    return await Appointment.findByIdAndUpdate(appointmentId, updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate("doctor")
    .populate("patient")
    .populate("createdBy", "-password");
};

// delete appointment

export const deleteAppointment = async (appointmentId)=>{
    return await Appointment.findByIdAndDelete(appointmentId);
};

/**
 * Find Doctor Appointment By Slot
 * (Double Booking Check)
 */

export const findDoctorAppointmentBySlot = async (
    doctorId,
    appointmentDate,
    startTime,
    endTime
)=>{
    return await Appointment.findOne({
        doctor: doctorId,
        appointmentDate: appointmentDate,
        startTime,
        endTime,
        status:{
            $ne: "cancelled",
        }
    });
}