import Patient from "../models/patient.model.js";

// create new patient

export const createPatient = async(patientData)=>{
    return await Patient.create(patientData);
};

// get all patient

export const getAllPatient = async () =>{
    return await Patient.find().populate("user", "firstName lastName email phone role");
};

// get patient by id

export const getPatientById = async (patientId)=>{
    return await Patient.findById(patientId).populate("user", "firstName lastName email phone role");
};

// get patient by user id

export const getPatientByUserId = async (userId)=>{
    return await Patient.findOne({user: userId}).populate("user", "firstName lastName email phone role")
}

// update patient

export const updatePatient = async (patientId, updateData)=>{
    return await Patient.findByIdAndUpdate(patientId, updateData,
        {new: true, runValidators: true}
    ).populate("user", "firstName lastName email phone role")
}

// update patient by user id

export const updatePatientByUserId = async (userId, updateData)=>{
    return await Patient.findOneAndUpdate(
        {
            user: userId
        },
        updateData,
        {
            new: true, 
            runValidator: true
        }
    ).populate("user", "firstName lastName email phone role")
}

// delete patient

export const deletePatient = async (patientId)=>{
    return await Patient.findByIdAndDelete(patientId);
}