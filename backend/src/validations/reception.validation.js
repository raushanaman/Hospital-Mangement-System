import { body, param } from "express-validator";

/*
Create Receptionist Validation
*/

export const createReceptionValidation = [
    body("user")
        .notEmpty()
        .withMessage("User is required")
        .isMongoId()
        .withMessage("Invalid User ID"),

    body("employeeId")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ min: 5, max: 200 })
        .withMessage("phone number exactly contain 10 digits"),

    body("shift")
        .notEmpty()
        .withMessage("shift is required")
        .isIn(["morning", "evening", "night"])
        .withMessage("shift must be either morning, evening or night"),

    body("address")
        .optional()
        .isLength({ min: 5, max: 200 })
        .withMessage("Address must be between 5 and 200 characters"),


];

/*
Update Receptionist Validation
*/

export const updateReceptionValidation = [
    body("employeeId")
        .optional()
        .isLength({ min: 5, max: 200 })
        .withMessage("Employee Id must be between 3 and 20 characters"),

    body("phoneNumber")
        .optional()
        .matches(/^[0-9]{10}$/)
        .withMessage("Phone number must contain exactly 10 digits"),


    body("shift")
        .optional()
        .isIn(["morning", "evening", "night"])
        .withMessage("shift must be either morning, evening or night"),

    body("address")
        .optional()
        .isLength({ min: 5, max: 200 })
        .withMessage("Address must be between 5 and 200 characters"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be true or false"),
];

/*
Receptionist ID Validation
*/
export const receptionistIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid receptionist id"),
];