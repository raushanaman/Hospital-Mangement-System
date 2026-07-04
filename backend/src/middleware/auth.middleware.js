import jwt from "jsonwebtoken";

import User from "../models/user.js";

const Protection = async (req,res, next)=>{
    try {
        // extract token from authorization header
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        {
            token = req.headers.authorization.split(" ")[1];
        }

        // if we don't get token then

        if(!token){
            return res.status(401).json({
                success:false,
                message: "Access denied"
            })
        }

        // verify the token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //FETCH USER FROM DATABASE

        const user = await User.findById(decoded.id).select("-password");

        //check wheater user exist or not

        if(!user){
            return res.status(401).json({
                success:false,
                message: "user not found",
            })
        }

        //check wheater user is active or not

        if(!user.isActive){
            return res.status(403).json({
                success:false,
                message: "Access denied, inactive user",
            })
        }
        //attach user in thee request object

        req.user = user;
        
        next();


    } catch (error) {
        return res.status(401).json({
        success: false,
        message: "Invalid or Expired Token",
    });
    }
}

export default Protection