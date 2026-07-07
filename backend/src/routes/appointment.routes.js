import express from "express";

import {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    updateAppointmentStatus,
    getMyAppointment,

} from "../controllers/appointment.controller.js";


import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

import {
    createAppointmentValidation,
    updateAppointmentValidation,
    updateAppointmentStatusValidation,
    appointmentIdValidation
} from "../validations/appointment.validation.js";

import validate from "../middleware/validate.middleware.js";

const router = express.Router();

/*
Patient & Receptionist
Create Appointment
*/

router.post("/",
    Protection,
    authorize("patient", "receptionist"),
    createAppointmentValidation,
    validate,
    createAppointment
);

/*
Admin & Receptionist
Get All Appointments
*/


router.get("/",
    Protection,
    authorize("admin","recptionist"),
    getAllAppointments
);

/*
Doctor & Patient
Get My Appointments
*/

router.get("/my",
    Protection,
    authorize("doctor", "patient"),
    getMyAppointment
);

/*
Admin & Receptionist
Get Appointment By Id
*/

router.get("/:id",
    Protection,
    authorize("admin", "receptionist"),
    appointmentIdValidation,
    validate,
    getAppointmentById
)

/*
Admin & Receptionist
Update Appointment
*/

router.put("/:id",
    Protection,
    authorize("admin", "receptionist")
);

/*
Admin, Doctor & Receptionist
Update Appointment Status
*/

router.patch("/:id/status",
    Protection,
    authorize("admin", "doctor", "receptionist"),
    appointmentIdValidation,
    updateAppointmentStatusValidation,
    validate,
    updateAppointmentStatus
)

/*
Admin
Delete Appointment
*/
router.delete(
    "/:id",
    Protection,
    authorize("admin"),
    appointmentIdValidation,
    validate,
    deleteAppointment
);

export default router;