import express from "express";

import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    getMyProfile,
    updateMyProfile,
    updateDoctor,
    deleteDoctor,
    searchDoctorByName
} from "../controllers/doctor.controller.js"

import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createDoctorValidation,
    updateDoctorValidation,
    updateDoctorProfileValidation,
    doctorIdValidation,
} from "../validations/doctor.validation.js";

const router = express.Router();

router.use(Protection);
// router.use(authorize("admin"));

//create doctor

router.post(
    "/",
    authorize("admin"),
    createDoctorValidation,
    validate,
    createDoctor
);

// search doctor by name

router.get("/search",
    authorize("admin", "receptionist"),
    searchDoctorByName
);

// Logged-in Doctor — must be BEFORE /:id
router.get("/me", authorize("doctor"), getMyProfile);
router.put("/me", authorize("doctor"), updateDoctorProfileValidation, validate, updateMyProfile);

// GET ALL doctors
router.get("/", authorize("admin"), getAllDoctors);

// get doctor by id
router.get("/:id", authorize("admin"), doctorIdValidation, validate, getDoctorById);

// update doctor
router.put("/:id", authorize("admin"), updateDoctorValidation, validate, updateDoctor);

// delete doctor
router.delete("/:id", authorize("admin"), doctorIdValidation, validate, deleteDoctor);

export default router;