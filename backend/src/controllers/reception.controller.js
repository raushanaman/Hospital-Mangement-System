import * as receptionService from "../services/receptionist.service.js";

// create receptionist

export const createReceptionist =async (req, res) =>{
    try {
        const receptionist = receptionService.createReceptionist(req.body);

        res.status(201).json({
            success: true,
            message: "Receptionist created successfully",
            data: receptionist
        })
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,

        })
        
    }
};

// get all receptionist

export const getAllReceptionist = async(req, res) =>{
    try{
        const receptionist = await receptionService.getAllReceptionist();
        res.status(200).json({
            success: true,
            count: receptionist.length,
            data: receptionist,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
    
}


// get receptionist by id

export const getReceptionistById = async(req,res)=>{
    try{
        const receptionist = await receptionService.getReceptionistById(req.params.id);

        res.status(200).json({
            success: true,
            data: receptionist,
        });
    }catch(error){
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

// update receptionist

export const updateReceptionist = async (req, res)=>{
    try {
        const receptionist = await receptionService.updateReceptionist(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "receptionist updated successfully",
            data: receptionist,
        })
    } catch (error) {

         res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }
}

// delete receptionist

export const deleteReceptionist = async(req,res)=>{
    try {
        const receptionist = await receptionService.deleteReceptionist(req.params.id);
        res.status(200).json({
            success: true,
            message: "Receptionist deleted successfully",
        });
    } catch (error) {
         res.status(404).json({
            success: false,
            message: error.message,
        });
    }
}

// get my profile 

export const getMyProfile = async(req,res)=>{
    try {
        const receptionist = await receptionService.getMyProfile(req.user._id);
        res.status(200).json({
            success:true,
            data: receptionist,
        })
    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });
        
    }
}

// update my profile

export const updateMyProfile = async (req,res)=>{
    try {
        
        const receptionist = await receptionService.updateMyProfile(req.user._id, req.body);

        res.status(200).json({
            success: true,
            message: "profile updated successfully",
            data: receptionist,
        })
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }

}
