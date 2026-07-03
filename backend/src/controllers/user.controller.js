import * as userService from  "../services/user.service.js";

// get all users

export const getAllUsers = async (req,res)=>{
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }
}

// get useer by id

export const getUserById = async (req,res) =>{
    try {
         const user = await userService.getUserById(req.params.id);

         res.status(200).json({
            success: true,
            data: user,
         })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
        
    }

}

// update user

export const updateUser = async (req, res)=>{
    try {
        const user = await userService.updateUser(
            req.params.id,
            req.body
        )

        res.status(200).json({
            success: true,
            message:"User Updated Successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// delete user

export const deleteUser = async (req, res)=>{
    try {
        const result = await userService.deleteUser(req.params.id);

        res.status(200).json({
            success: true,
            message: result.message,
        })
    } catch (error) {
         res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//update user status

export const updateUserStatus = async (req, res)=>{
    try {
        const updateUser = await userService.updateUserStatus(
            req.params.id,
            req.body.isActive
        );
        res.status(200).json({
            success:true,
            message: "User status updated successfully",
            data: updateUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}