import * as doctorRepo from "../repositories/doctor.repository.js";

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
    const doctor = await doctorRepo.updateDoctor(id);

    if(!doctor){
        throw new Error("Doctor not found");

    }
    return await doctorRepo.updateDoctor(id,updateData);
}

// delete doctor

export const deleteDoctor = async(id)=>{
    const doctor = await doctorRepo.findDoctorByUserId(id);

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
    const doctor = await doctorRepo.getDoctorById(userId)
    if(!doctor){
        throw new Error("Doctor not exist");
    }

    return doctor;
}

// update doctor profile

export const updateMyProfile = async (userId, updateData) =>{
    const doctor = await doctorRepo.findDoctorByUserId(userId);

    if(!doctor){
        throw new Error("Doctor not found");
    }

    // allowed fields only

    const allowedFields = ["specialization","experience","consultationFee","availability", "workingDays"];

    const updateData1 = {};

    allowedFields.forEach((field)=>{
        if(data[field] !== undefined){
            updateData1[field]= data[field];
        }
    });
    return await doctorRepo.updateDoctorbyUserId(userId, updateData);
}