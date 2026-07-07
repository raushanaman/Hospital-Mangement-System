import Receptionist from "../models/receptionist.model.js";

// create receptionist

export const createReceptionist = async(receptionistData)=>{
    return await Receptionist.create(receptionistData);
}

// get all receptionist


export const getAllReceptionist = async (filter = {})=>{
    return await Receptionist.find(filter)
    .populate("user", "-password");
}

// Get Receptionist By Id


export const getReceptionistById = async (receptionistId)=>{
    return await Receptionist.findById(receptionistId)
    .populate("user", "-password");
}
// find one receptionist 

export const findReceptionist = async(filter)=>{
    return await Receptionist.findOne(filter);
}
// Get Receptionist By User Id


export const getReceptionistByUserId = async(userId)=>{
    return await Receptionist.findOne(
        {user: userId}
    ).populate("user", "-password")
}

// Update Receptionist

export const updateReceptionist = async(receptionistId, 
    updateData)=>{
        return await Receptionist.findByIdAndUpdate(receptionistId,
            updateData,{
                new: true,
                runValidators: true,
            }
        ).populate("user", "-password");
    };

// delete receptionist

export const deleteReceptionist = async(receptionistId)=>{
    return await Receptionist.findByIdAndDelete(receptionistId);
};