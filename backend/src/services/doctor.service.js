import * as doctorRepo from "../repositories/doctor.repository.js";
import * as appointRepo from "../repositories/appointment.repository.js";
import User from "../models/user.js";

// create doctor

export const createDoctor = async (doctorData)=>{

    //checking if user exist

    const user = await User.findById(doctorData.user);

    if(!user){
        throw new Error("user not found");
    }

    // check role 
    if(user.role !== "doctor"){
        throw new Error("Selected user is not a doctor");
    }

    //check if doctor profile is already exists

    const existingDoctor = await doctorRepo.findDoctorByUserId(doctorData.user);
    if(existingDoctor){
        throw new Error("Doctor profile already exists");
    }

    //save doctor if not exist

    return await doctorRepo.createDoctor(doctorData);
    
};

//get all doctors

export const findAllDoctors = async()=>{
    return await doctorRepo.findAllDoctors();
}

// get doctor by id

export const getDoctorById = async(id)=>{
    const doctor = await doctorRepo.getDoctorById(id);

    if(!doctor){
        throw new Error("Doctor not found");
    }
    return doctor;   
}


//update doctor

export const updateDoctor = async(id, updateData)=>{
    const doctor = await doctorRepo.getDoctorById(id);

    if(!doctor){
        throw new Error("Doctor not found");

    }
     delete updateData.licenseNumber;
     delete updateData.user;
    return await doctorRepo.updateDoctor(id,updateData);
}

// delete doctor

export const deleteDoctor = async(id)=>{
    const doctor = await doctorRepo.getDoctorById(id);

    if(!doctor){
        throw new Error("Doctor not found");

    }
    await doctorRepo.deleteDoctor(id);
    return{
        message: "Doctor deleted succussfully"
    };
};

// see doctor profile

export const getMyProfile = async (userId)=>{
    const doctor = await doctorRepo.findDoctorByUserId(userId)
    if(!doctor){
        throw new Error("Doctor not exist");
    }

    return doctor;
}

// search doctor by name with appointments

export const searchDoctorByName = async (name) => {
    if (!name) throw new Error("Name is required for search");

    const doctors = await doctorRepo.searchDoctorByName(name);

    if (!doctors.length) throw new Error("No doctor found with this name");

    const result = await Promise.all(
        doctors.map(async (doctor) => {
            const appointments = await appointRepo.getAllAppointment({ doctor: doctor._id });
            return { doctor, appointments };
        })
    );
    return result;
}

// update doctor profile

export const updateMyProfile = async (userId, updateData) =>{
    const doctor = await doctorRepo.findDoctorByUserId(userId);

    if(!doctor){
        throw new Error("Doctor not found");
    }

    const allowedFields = ["specialization","experience","consultationFee","availability", "workingDays", "department", "startTime", "endTime"];

    const filteredData = {};

    allowedFields.forEach((field)=>{
        if(updateData[field] !== undefined){
            filteredData[field] = updateData[field];
        }
    });
    return await doctorRepo.updateDoctorbyUserId(userId, filteredData);
}