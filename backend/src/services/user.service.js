import * as userRepo from "../repositories/user.repository.js";

// get all users

export const getAllUsers = async ()=>{
    return await userRepo.findAllUsers();
}



//get user by id

export const getUserById = async (id)=>{
    const user = await userRepo.findUserById(id);

    if(!user){
        throw new Error("user not found");
    }
    return user;
}

// update user

export const updateUser = async (id, updateData)=>{
    const user = await userRepo.findUserById(id);

    if(!user){
        throw new Error("user not found");
    }
    return await userRepo.updateUser(id,updateDate);
}

// delete user

export const deleteUser = async (id)=>{
    const user = await userRepo.findUserById(id);

    if(!user){
        throw new Error("user not fourn")
    }

    await userRepo.deleteUser(id);

    return{
        message: "user deleted successfully",
    }
}

//update user status

export const updateUserStatus = async (id, isActive)=>{
    const user = await userRepo.findUserById(id);

    if(!user){
        throw new Error ("user not found");
    }

    return await userRepo.updateUserStatus(id, isActive);
}