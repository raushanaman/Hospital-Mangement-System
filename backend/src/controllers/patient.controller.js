import * as patientService from "../services/patient.service.js";

// create patient

export const createPatient = async (req, res)=>{
    const paitent = await patientService.createNewPatient(req.body);
    try {
        
        return res.status(201).json({
            success: true,
            message:"patient creted successfully",
            data: patient
        });
    } catch (error) {
       return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

// get all patients

export const getAllPatients = async (req, res)=>{
    const patient = await patientService.getAllPatients()
    try {
        return res.status(200).json({
            success: true,
            count: patient.length,
            data: patient
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
        
    }
}

// get all patient by  id

export const getAllPatientByAdmin = async (req,res)=>{
    try {
        const patient = await patientService.getAllPatientByAdmin(req.params.id);

        return res.status(200).json({
            success: true,
            data: patient
        });

    } catch (error) {

         return res.status(404).json({
            success: false,
            message: error.message
        });
        
    }
}

// update patient

export const updatePatient = async (req,res)=>{
    try {
        const patient = await patientService.updatePateintByAdmin(
            req.params.id, req.body
        );
        return res.status(200).json({
            success: true,
            message:  "patient updated successfully",
            data: patient
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// delete patient

export const deletePatient = async (req,res)=>{
    try {
        const patient = await patientService.deletePatient(req.params.id)
        return res.status(200).json({
            success: true,
            message: "patient deleted successfully"
        })
    } catch (error) {

        return res.status(404).json({
            success: false,
            message: error.message
        });
        
    }
}

// get logged in  profile

export const getMyProfile = async(req, res)=>{
    try {
        const patient = await patientService.getMyProfile(req.user._id);
        return res.status(200).json({
            success: true,
            data: patient
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }
}

// update logged in profile

export const updatedProfile = async (req, res)=>{
    try {
        const updateProfileByUser = await patientService.updateMyProfile(
            req.user._id,
            req.body
        )

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: patient
        });
    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });
        
    }
}