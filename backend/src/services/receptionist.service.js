import User from "../models/user.js";

import * as receptionRepo from "../repositories/reception.repository.js";

// Create Receptionist

export const createReceptionist = async (receptionistData)=>{
    const user = await User.findById(receptionistData.user);

    // check user exist or not

    if(!user){
        throw new error("user not found");
    }
    // check role
    if(user.role !== "receptionist"){
        throw new Error("user is not a receptionist");
    }

    // check if receptionist already exist

    const existingReceptionist = await receptionRepo.findReceptionist({
        user: receptionistData.user,
    });

    if(existingReceptionist){
        throw new Error("receptionist already exist for this user");
    }

    return await receptionRepo.createReceptionist(receptionistData);
}

// get all receptionist

export const getAllReceptionist = async()=>{
    return await receptionRepo.getAllReceptionist();
}

//get receptionist by id

export const getReceptionistById = async(receptionistId)=>{
    const receptionist = await receptionRepo.getReceptionistById(receptionistId);

    if(!receptionist){
        throw new Error("receptoinist not found");
    }
    return receptionist;
}

// update receptionist (admin)

export const updateReceptionist = async(
    receptionistId,
    updateData
)=>{
    const receptionist = await receptionRepo.getReceptionistById(receptionistId);

    if(!receptionist){
        throw new Error("receptionist not found");
    }
    const allowedFields = [
        "employeeId",
        "phoneNumber",
        "shift",
        "address",
        "isActive",
    ];

    const filteredData = {};

    Object.keys(updateData).forEach((key)=>{

        if(allowedFields.includes(keys)){
            filteredData[key]= updateData[key];
        }

    });
    return await receptionRepo.updateReceptionist(
        receptionistId,
        filteredData)
}

// delete receptionist 

export const deleteReceptionist = async (
    receptioistId 
)=>{
    const receptionist = await receptionRepo.getReceptionistById(receptionistId);

    if(!receptionist){
        throw new Error(
            "receptionist not found"
        );
    }
    return await receptionRepo.deleteReceptionist(receptionistId);
}

// get my profile

export const getMyProfile = async (userId)=>{
    const receptionist = await receptionRepo.getReceptionistByUserId(userId);

    if(!receptionist){
        throw new Error(
            "Receptionist profile not found"
        );
    }

    return receptionist;
}

// update my Profile

export const updateMyProfile = async(
    userId,
    updateData
)=>{
    const receptionist =await receptionRepo.getReceptionistByUserId(userId);

    if(!receptionist){
        throw new Error("Receptionist profile not found");
    }

    const allowedFields = [
        "phoneNumber",
        "address",
    ];

    const filteredData = {};

    Object.keys(updateData).forEach((key) =>{
        if(allowedFields.includes(key)){
            filteredData[key] = updateData[key];
        }
    });
    return await receptionRepo.updateReceptionist(
        receptionist._id,
        filteredData
    );
}