import {body} from "express-validator";

export const registerValidation = [
    body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({min: 3})
    .withMessage("First Name must be at least 3 characters"),

    body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

    body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required"),

    body("password")
    .isLength({min: 6})
    .withMessage("Password must be at least 6 characters"),

    body("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["male", "female", "other"])
    .withMessage("Invalid gender"),

    body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),

    body("role")
    .isIn(["admin", "receptionist", "doctor", "patient"])
    .withMessage("Invalid role"),

    body("dateOfBirth")
    .optional()
    .custom((value) => {
        const dob = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (dob > today) {
            throw new Error("Date of birth cannot be a future date");
        }
        return true;
    })
]

// login validation below

export const loginValidation = [
    body("email")
    .isEmail()
    .withMessage("Valid email is required"),
    
    body("password")
    .notEmpty()
    .withMessage("Password is required")
]
