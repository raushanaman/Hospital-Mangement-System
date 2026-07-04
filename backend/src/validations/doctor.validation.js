import {body, param} from "express-validator";

// create doctor validation

export const createDoctorValidation = [
    body("user")
    .notEmpty()
    .withMessage("user id is required")
    .isMongoId()
    .withMessage("Invalid user ID"),

    body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required")
    .isLength({min: 5, max: 50})
    .withMessage("Specialization must be between 5 and 50 characters"),


    body("department")
    .trim()
    .notEmpty()
    .withMessage("Department is required")
    .isLength({min: 5, max: 50})
    .withMessage("Department must be between 5 and 50 characters"),

    // body("qualification")
    // .trim()
    // .notEmpty()
    // .withMessage("Qualification is required")
    // .isLength({min: 5, max: 100})
    // .withMessage("Qualification must be between 5 and 100 characters"),

    body("experience")
    .notEmpty()
    .withMessage("Experience is required")
    .isInt({min: 0})
    .withMessage("Experience must be a positive integer"),


    body("consultationFee")
    .notEmpty()
    .withMessage("Consultation fee is required")
    .isFloat({min: 0})
    .withMessage("Consultation fee must be a positive number"),

    body("licenseNumber")
    .trim()
    .notEmpty()
    .withMessage("License number is required"),

    body("availability")
    .optional()
    .isBoolean()
    .withMessage("Availability must be true of false"),

    body("workingDays")
    .optional()
    .isArray({min: 1})
    .withMessage("working array must be an array"),


     body("startTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("Start time must be in HH:mm format"),

    body("endTime")
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage("End time must be in HH:mm format"),

];


// doctor Id validation

export const doctorIdValidation = [
    param("id")
    .isMongoId()
    .withMessage("Invalid doctor ID"),
];

// update doctor validation

export const updateDoctorValidation = [
    param("id")
    .isMongoId()
    .withMessage("Invalid doctor Id"),

    body("specialization")
    .optional()
    .trim()
    .isLength({min: 5, max: 50})
    .withMessage("Specialization must be between 5 and 50 characters"),

     body("department")
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Department must be between 2 and 50 characters"),

    // body("qualification")
    //     .optional()
    //     .trim()
    //     .isLength({ min: 2, max: 100 })
    //     .withMessage("Qualification must be between 2 and 100 characters"),

    body("experience")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Experience must be a positive integer"),

    body("consultationFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Consultation fee must be a positive number"),

    body("availability")
        .optional()
        .isBoolean()
        .withMessage("Availability must be true or false"),
]

// doctor profile update validation

export const updateDoctorProfileValidation = [

    body("specialization")
        .optional()
        .trim()
        .isLength({ min: 5, max: 50 })
        .withMessage("Specialization must be between 5 and 50 characters"),

    body("department")
        .optional()
        .trim()
        .isLength({ min: 5, max: 50 })
        .withMessage("Department must be between 5 and 50 characters"),

    body("experience")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Experience must be a positive integer"),

    body("consultationFee")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Consultation fee must be positive"),

    body("availability")
        .optional()
        .isBoolean()
        .withMessage("Availability must be true or false"),

    body("workingDays")
        .optional()
        .isArray({ min: 1 })
        .withMessage("Working days must be an array"),

];