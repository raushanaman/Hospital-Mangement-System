import {body, param} from "express-validator"

// create appointment validation

const customValidation = (value)=>{
    const today = new Date();
        today.setHours(0,0,0,0);

        const appointmentDate = new Date(value);
        appointmentDate.setHours(0, 0, 0, 0);
        if(appointmentDate < today){
            throw new Error("Appointment date cannot be in the past");
        }
        return true;
}

export const createAppointmentValidation = [
    body("doctor")
    .notEmpty()
    .withMessage("Doctor is required")
    .isMongoId()
    .withMessage("Invalid doctor id"),

    body("patient")
    .notEmpty()
    .withMessage("patient is required")
    .isMongoId()
    .withMessage("Invalid patient id"),

    body("appointmentDate")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom(customValidation),
        

    body("startTime")
        .notEmpty()
        .withMessage("Start time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Start time must be in HH:mm format"),

    body("endTime")
        .notEmpty()
        .withMessage("End time is required")
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("End time must be in HH:mm format"),

    body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({min:5, max: 500})
    .withMessage("reason must be between 5 and 500 characters"),

    body("consultationFee")
    .optional()
    .isNumeric()
    .withMessage("Consultation fee must be  a number")
];

// update appointment validation

export const  updateAppointmentValidation = [
    body("appointmentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid appointment date")
    .custom(customValidation),

    body("startTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Start time must be in HH:mm format"),

    body("endTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("End time must be in HH:mm format"),

    body("reason")
    .optional()
    .trim()
    .isLength({min:5, max: 500})
    .withMessage("reason must be between 5 and 500 characters"),

    body("consultationFee")
    .optional()
    .isNumeric()
    .withMessage("Consultation Fee must be a number")
];

export const updateAppointmentStatusValidation = [
    body("status")
    .withMessage("Status is required")
    .isIn([
        "pending",
        "confirmed",
        "completed",
        "cancelled"
    ])
    .withMessage("Invalid appointment status")

];

export const appointmentIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid appointment id")
];