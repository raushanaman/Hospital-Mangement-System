import express from "express";

import {register, login, getProfile} from "../controllers/auth.controllers.js"
import {registerValidation,loginValidation} from "../validations/auth.validation.js"
import validate from "../middleware/validate.middleware.js";
import Protection from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = express.Router();

router.post("/register",
    ...registerValidation,
    validate,
    register
)

//login route
router.post(
    "/login",
    ...loginValidation,
    validate,
    login
)

router.get("/profile", 
    Protection, 
    getProfile
)

router.get("/admin", Protection,
    authorize("admin"),
    (req,res)=>{
        res.status(200).json({
            success:true,
            message: "Welcome Admin",
            user:req.user
        })
    }
)

router.get("/patient",Protection,
    authorize("patient"),
    (req, res)=>{
        res.status(200).json({
            success:true,
            message: "Welcome Patient",
            user:req.user
        })
    }
)
router.get("/doctor",Protection,
    authorize("doctor"),
    (req, res)=>{
        res.status(200).json({
            success:true,
            message: "Welcome Doctor",
            user:req.user
        })
    }
)
router.get("/receptionist",Protection,
    authorize("receptionist"),
    (req, res)=>{
        res.status(200).json({
            success:true,
            message: "Welcome Receptionist",
            user:req.user
        })
    }
)

export default router;