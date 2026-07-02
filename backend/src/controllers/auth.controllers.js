import * as authService from "../services/auth.service.js";

export const register = async (req, res) =>{
    try{
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// login controller

export const login = async (req, res) =>{
    try {
        const data = await authService.loginUser(req.body);
        res.status(200).json({
            success:true,
            message: "User logged in successfully",
            ...data
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getProfile = async (req, res)=>{
    try {
       return res.status(200).json({
            success:true,
            user: req.user,
        })
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}