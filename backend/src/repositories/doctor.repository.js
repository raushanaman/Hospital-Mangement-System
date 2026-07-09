import Doctor from "../models/doctor.model.js";
import User from "../models/user.js";

// create doctor

export const createDoctor = async (doctorData)=>{
    return await Doctor.create(doctorData);
};

// get all doctors

export const findAllDoctors = async()=>{
    return await Doctor.find()
    .populate("user", "firstName lastName email phone")
    .sort({createdAt: -1})
};

// get doctor by id

export const getDoctorById = async(id)=>{
    return await Doctor.findById(id)
    .populate("user", "firstName lastName email phone");
};

// update doctor

export const updateDoctor = async (id, updateData)=>{
    return await Doctor.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate("user", "firstName lastName email phone");
};

export const updateDoctorbyUserId = async (userId, updateData)=>{
    return await Doctor.findOneAndUpdate(
        {user: userId},
        updateData,
        {
            new: true,
            runValidators: true,
        }
    ).populate("user","firstName lastName email phone")
}


// delete doctor

export const deleteDoctor = async (id)=>{
    return await Doctor.findByIdAndDelete(id);
}

// find doctor by user id

export const findDoctorByUserId = async (userId)=>{
    return await Doctor.findOne({user: userId})
    .populate("user", "firstName lastName email phone");
}

// search doctor by name with appointments

export const searchDoctorByName = async (name) => {
    const users = await User.find({
        $or: [
            { firstName: { $regex: name, $options: "i" } },
            { lastName: { $regex: name, $options: "i" } }
        ],
        role: "doctor"
    }).select("_id");

    const userIds = users.map(u => u._id);

    return await Doctor.find({ user: { $in: userIds } })
        .populate("user", "firstName lastName email phone");
}