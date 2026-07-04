import * as docService from "../services/doctor.service.js";


//create doctor

export const createDoctor = async(req, res)=>{

    try {
        const doctor = await docService.createDoctor(req.body);
    
        res.status(201).json({
            success: true,
            message:"Doctor Created Successfully",
            data: doctor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}


// get all doctors

export const getAllDoctors = async (req, res)=>{
    try {
        const doctors = await docService.findAllDoctors();

        res.status(200).json({
            success: true,
            count: doctors.length,
            data: doctors
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

// get doctor by id

export const getDoctorById = async (req, res)=>{
    try {
        const doctor = await docService.getDoctorById(req.params.id);

        res.status(200).json({
            success: true,
            data: doctor,
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
        
    }
}

// update doctor

export const updateDoctor = async (req, res)=>{
    try {
        const doctor = await docService.updateDoctor(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: "Doctor update succussfully",
            data: doctor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }

    
}

// delete doctor

export const deleteDoctor = async (req, res)=>{
    try {
        const doctor = await docService.deleteDoctor(req.params.id);
        res.status(200).json({
            success: true,
            message: doctor.message
        })
    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        })
        
    }
}

// get logged-in doctor profile

export const getMyProfile = async (req, res) =>{
    try {
        const doctor = await docService.getMyProfile(req.user.id);
        res.status(200).json({
            success: true,
            data: doctor
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}

// update logged in doctor profile

export const updateMyProfile = async(req,res)=>{
    try{
        const doctor = await docService.updateMyProfile(req.user.id, req.body);

        res.status(200).json({
            success: true,
            message: "Doctor profile updated successfully",
            data: doctor
        })
    }catch(error)
    {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}