import User from "../models/user.js";

export const findUserByEmail = async (email)=>{
    return await User.findOne({email});
}

export const createUser = async ( userData)=>{
    return await User.create(userData)
}

export const findUserById = async (id)=>{
    return await User.findById(id);
}

export const findUserForLogin = async (email)=>{
    return await User.findOne({email}).select("+password");
}

export const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
}