import Appointment from "../models/appointment.model.js";

// create appointment

export const createAppointment =async (appointmentData)=>{
    return await Appointment.create(appointmentData);
}

// get all appointments

export const getAllAppointment = async (filter = {},
    page = 1,
    limit = 10,
    sort = "latest"
)=>{

    const skip =(Number(page-1))*limit;
    const sortOption = sort=== "oldest"?{createdAt: 1}:{createdAt: -1};
    return await Appointment.find({...filter,
        isDeleted: false}
    )
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .populate("doctor")
    .populate("patient")
    .populate("createdBy","-password");
};

// get appointment by id

export const getAppointmentById = async (appointmentId)=>{
    return await Appointment.findOne({_id: appointmentId, 
        isDeleted: false
    })
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
    return await Appointment.findByIdAndUpdate(appointmentId,
        {isDeleted: true},
        {new: true}
    );
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

// find appointment by date

export const findDoctorAppointmentByDate = async(
    doctorId,
    appointmentDate)=>{
        return await Appointment.find({
            doctor: doctorId,
            appointmentDate
        });
    }

// search doctor and patient by name

export const searchAppointment = async (
    filter = {},
    page = 1,
    limit = 10,
    sort = "latest"
) => {
    const skip = (page - 1) * limit;
    const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

    return await Appointment.find({
        ...filter,
        isDeleted: false
    }).sort(sortOption)
    .skip(skip)
    .limit(limit)
    .populate({
        path: "doctor",
        populate: {
            path: "user",
            select: "firstName lastName email"
        }
    }).populate({
        path: "patient",
        populate: {
            path: "user",
            select: "firstName lastName email"
        }
    }).populate("createdBy", "-password");
}