import {body, param} from "express-validator";

// create patient validation

export const createPatientValidation = [
    body("user")
    .notEmpty()
    .withMessage("user id is required")
    .isMongoId()
    .withMessage("Invalid user id"),

    body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of Birth is required")
    .isISO8601()
    .withMessage("invalid date format"),

    body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),

    body("bloodGroup")
    .notEmpty()
    .withMessage("Blood group is required")
    .isIn(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .withMessage("Invalid blood group"),

    body("height")
    .optional()
    .isFloat({min: 0})
    .withMessage("Height must be a positive number"),

    body("weight")
    .optional()
    .isFloat({min: 0})
    .withMessage("Weight must be a positive number"),

    body("address")
    .optional()
    .trim()
    .isLength({max: 255})
    .withMessage("Address is too long"),

    body("emergencyContact")
    .notEmpty()
    .withMessage("Emergency contact is required")
    .trim()
    .isMobilePhone()
    .withMessage("Invalid phone number"),

    body("allergies")
    .optional()
    .isArray()
    .withMessage("Allergies must be an array"),

    body("medicalHistory")
    .optional()
    .isArray()
    .withMessage("Medical history must be an array"),

]

// patient update validation

export const updatePatientValidation = [

    body("dateOfBirth")
        .optional()
        .isISO8601()
        .withMessage("Invalid date"),

    body("gender")
        .optional()
        .isIn(["male", "female", "other"])
        .withMessage("Invalid gender"),

    body("bloodGroup")
        .optional()
        .isIn([
            "A+",
            "A-",
            "B+",
            "B-",
            "AB+",
            "AB-",
            "O+",
            "O-"
        ])
        .withMessage("Invalid blood group"),

    body("height")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Invalid height"),

    body("weight")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Invalid weight"),

    body("address")
        .optional()
        .trim()
        .isLength({ max: 250 })
        .withMessage("Address too long"),

    body("emergencyContact")
        .optional()
        .trim()
        .isMobilePhone()
        .withMessage("Invalid mobile number"),

    body("allergies")
        .optional()
        .isArray()
        .withMessage("Allergies must be an array"),

    body("medicalHistory")
        .optional()
        .isArray()
        .withMessage("Medical history must be an array"),

];

export const patientIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid patient id")

];