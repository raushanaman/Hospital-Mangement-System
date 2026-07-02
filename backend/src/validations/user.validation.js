import {body, param} from "express-validator";

// validate MongoDB User Id

export const userIdValidation = [
    param("id").isMongoId()
    .withMessage("Invalid user ID")
]

// UPDATE uSER validation

export const updateUserValidation = [
    param("id")
    .isMongoId()
    .withMessage("Invalid user Id"),


    body("firstName")
    .optional()
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage("First Name must be between 3 and 50 characters"),

    body("lastName")
    .optional()
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage("LastName must be between 3 to 50 characters"),

    body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email"),

    body("phone")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Please provide a valid phone number"),

];

//update User status validation

export const updateUserStatusValidation = [
    param("id")
    .isMongoId()
    .withMessage("Invalid user ID"),

   body("isActive")
   .isBoolean()
   .withMessage("isActive must be true of false")
]