import express from "express";

import {
    getAllUsers,
    getUserById,
    updateUser,
    updateUserStatus,
    deleteUser} from "../controllers/user.controller.js";

import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import validate from "../middleware/validate.middleware.js";
import { userIdValidation,
    updateUserValidation,
    updateUserStatusValidation
 } from "../validations/user.validation.js";

const router = express.Router();

// Apply to all routes below
router.use(Protection);
router.use(authorize("admin"));

// get all user admin only

// router.get("/", Protection,
//     authorize("admin"), ye v sahi hai but har ek 
//                  route mein protection and  authorize(admin) repeat ho rha 
//                  issi liye upar ek bar declare kar diya
//     getAllUsers
// ); ab new route kuchh aaise honge see below


// get all user admin only
router.get("/", getAllUsers);


// get user by id

router.get("/:id",
    userIdValidation,
    validate,
    getUserById);

// update user admin only

router.put("/:id",
    updateUserValidation,
    validate,
    updateUser)

// update user status admin only

router.patch("/:id/status",
    updateUserStatusValidation,
    validate,
    updateUserStatus)


// delete user (admin only)

router.delete("/:id",
    userIdValidation,
    validate,
    deleteUser)

export default router;