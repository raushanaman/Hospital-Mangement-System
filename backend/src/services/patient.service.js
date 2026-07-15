import User from "../models/user.js";
import * as authRepo from "../repositories/auth.repository.js";
import * as patientRepo from "../repositories/patient.repository.js";

// create new patient

export const createNewPatient = async (patientData) => {
    const user = await User.findById(patientData.user);

    if (!user) {
        throw new Error("User not found");
    }
    if (user.role !== "patient") {
        throw new Error("selected user is not patient");
    }

    const existingPatient = await patientRepo.getPatientByUserId(patientData.user);
    if (existingPatient) {
        throw new Error("Patient profile already exist for this user");
    }

    try {
        return await patientRepo.createPatient(patientData);
    } catch (error) {
        // rollback: delete the user if patient profile creation fails
        await authRepo.deleteUserById(patientData.user);
        throw error;
    }
};

// get all patients

export const getAllPatients = async ()=>{
    const patient = await patientRepo.getAllPatient();

    if(!patient){
        throw new Error("patient not found");
    }
    return patient;
}


//get patient by id


export const getAllPatientByAdmin = async (patientId) => {
    const patient = await patientRepo.getPatientById(patientId);
    if (!patient) {
        throw new Error("patient not found");
    }
    return patient;
}

//update patient by by admin

export const updatePateintByAdmin = async(patientId, updateData)=>{
    const patient = await patientRepo.getPatientById(patientId);

    if(!patient){
        throw new Error("patient not found");
    }

     // Allowed fields only
    const allowedFields = [
        "dateOfBirth",
        "gender",
        "bloodGroup",
        "height",
        "weight",
        "address",
        "emergencyContact",
        "allergies",
        "medicalHistory"
    ];

    // Filter request body
    const filteredData = {};

    for (const field of allowedFields) {

        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }

    }
    return await patientRepo.updatePatient(
        patientId,
        filteredData
    );
};

// delete patient

export const deletePatient = async (patientId)=>{
    const patient = await patientRepo.getPatientById(patientId);

    if(!patient){
        throw new Error("patient not found");
    }

    return await patientRepo.deletePatient(patientId);

};

// get logged in patient profile

export const getMyProfile = async (userId)=>{
    const patient = await patientRepo.getPatientByUserId(userId);

    if(!patient){
        throw new Error("patient/user profile not found");
    }
    return patient;
}

export const updateMyProfile = async(userId, updateData)=>{
        const patient =  await patientRepo.updatePatientByUserId(userId);

        if(!patient){
            throw new Error("patient profile not found");
        }

        // only allowed fields can be updated

        const allowedFields = [
            "dateOfBirth",
            "gender",
            "bloodGroup",
            "height",
            "weight",
            "address",
            "emergencyContact",
            "allergies",
            "medicalHistory"
        ];
        const filterData = {}

        for(const field of allowedFields){
            if(updateData[field] !== undefined){
                filterData[field] = updateData[field];
            }
        }

        return await patientRepo.updatePatientByUserId(
            userId,
            filterData)
}