import  * as appointService from "../services/appointment.service.js";


// create appointment

export  const createAppointment = async (req,res)=>{
    try {
        const appointment = await appointService.createAppointment(req.body);
        res.status(201).json({
            success:true,
            message:"Appointment created successfully",
            data: appointment
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

// get all appointments

export const getAllAppointments = async (req, res)=>{
    try {
        const appointment = await appointService.getAllAppointments(req.query);
        res.status(200).json({
            success: true,
            count: appointment.length,
            data: appointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get appointment by id

export const getAppointmentById = async (req,res)=>{
    try {
        const appointment =await appointService.getAppointmentById(req.params.id);

        res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
             res.status(404).json({
            success: false,
            message: error.message,
        });   
    }
}

// update appointment

export const updateAppointment = async (req,res)=>{
    try {
        const appointment = await appointService.updateAppointment(
            req.params.id, req.body
        )
        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: appointment
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
        
    }
}

// delete appointment

export const deleteAppointment = async (req, res)=>{
    try {
        const appointment = await appointService.deleteAppointment(req.params.id);
        res.status(200).json({
            success: true,
            message: "Appointment deleted successfully",
        })
    } catch (error) {

         res.status(404).json({
            success: false,
            message: error.message,
        });
        
    }
}

// update appointment status

export const  updateAppointmentStatus =async (req,res)=>{
    try{
        const appointment = await appointService.updateAppointmentStatus(
            req.params.id,
            req.body.status
        );
        res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            data: appointment,
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

// get my appointments

export const getMyAppointment = async(req,res)=>{
    try {
        const appointment =
            await appointService.getMyAppointments(
                req.user
            );

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments,
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
}