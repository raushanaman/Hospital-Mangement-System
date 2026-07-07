import express from "express";

import {
    createReceptionist,
    getAllReceptionist,
    getReceptionistById,
    updateReceptionist,
    deleteReceptionist,
    getMyProfile,
    updateMyProfile
} from "../controllers/reception.controller.js";

import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
    createReceptionValidation,
    updateReceptionValidation,
    receptionistIdValidation
} from "../validations/reception.validation.js";

const router = express.Router();

// receptionist self routes

router.get(
    "/me",
    Protection,
    authorize("receptionist"),
    getMyProfile
);

router.put(
    "/me",
    Protection,
    authorize("receptionist"),
    updateReceptionValidation,
    validate,
    updateMyProfile
);

//admin routes

router.post(
    "/",
    createReceptionValidation,
    validate,
    Protection,
    authorize("admin"),
    createReceptionist
);

router.get(
    "/",
    Protection,
    authorize("admin"),
    getAllReceptionist
);

router.get(
    "/:id",
    Protection,
    authorize("admin"),
    receptionistIdValidation,
    validate,
    getReceptionistById
);

router.put(
    "/:id",
    Protection,
    authorize("admin"),
    receptionistIdValidation,
    updateReceptionValidation,
    validate,
    updateReceptionist
);

router.delete(
    "/:id",
    Protection,
    authorize("admin"),
    receptionistIdValidation,
    validate,
    deleteReceptionist
)

export default router;