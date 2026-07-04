import express from "express";

import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    getMyProfile,
    updateMyProfile,
    updateDoctor,
    deleteDoctor
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

// GET ALL doctors

router.get("/", authorize("admin"), getAllDoctors);

// get doctor by id

router.get("/:id",
    authorize("admin"),
    doctorIdValidation,
    validate,
    getDoctorById
);

//update doctor

router.put("/:id",
    authorize("admin"),
    updateDoctorValidation,
    validate,
    updateDoctor
);

// delete doctor

router.delete("/:id",
    authorize("admin"),
    doctorIdValidation,
    validate,
    deleteDoctor
);

// Logged-in Doctor

router.get(
    "/me",
    authorize("doctor"),
    getMyProfile
);

router.put(
    "/me",
    authorize("doctor"),
    updateDoctorProfileValidation,
    validate,
    updateMyProfile
);

export default router;