import express from "express";

import * as patientController from "../controllers/patient.controller.js";

import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createPatientValidation,
    updatePatientValidation,
    patientIdValidation,
} from "../validations/patient.validation.js"

const router = express.Router();

// protected routes

router.use(Protection);

// self routes patient

router.get(
    "/me",
    authorize("patient"),
    updatePatientValidation,
    validate,
    patientController.getMyProfile
)

router.put(
    "/me",
    authorize("patient"),
    updatePatientValidation,
    validate,
    patientController.updatedProfile
)

// admin routes

router.post(
    "/",
    authorize("admin", "receptionist"),
    createPatientValidation,
    validate,
    patientController.createPatient
);

router.get(
    "/",

    authorize("admin", "doctor", "receptionist"),
    patientController.getAllPatients
);

router.get(
    "/:id",
    patientIdValidation,
    validate,
    authorize("admin", "doctor", "receptionist"),
    patientController.getAllPatientByAdmin
)


router.put(
    "/:id",
    patientIdValidation,
    updatePatientValidation,
    validate,
    authorize("admin"),
    patientController.updatePatient
);

router.delete(
    "/:id",
    patientIdValidation,
    validate,
    authorize("admin"),
    patientController.deletePatient
);

export default router;