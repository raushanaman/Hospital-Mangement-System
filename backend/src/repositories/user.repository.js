import User from "../models/User.js";

// get all users

export const findAllUsers = async ()=>{
    return await User.find().select("-password");
}

// get user by id

export const findUserById = async (id)=>{
    return await User.findById(id).select("-password");

}

// update user

export const updateUser = async (id, userData)=>{
    return await User.findByIdAndUpdate(
        id,
        updateDate,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password");
}

// delete user

export const deleteUser = async (id)=>{
    return await User.findByIdAndDelete(id);
}

// update user status

export const updateUserStatus = async (id, isActive)=>{
    return await User.findByIdAndUpdate(
        id,
        {isActive},
        {new: true}
    ).select("-password");
};