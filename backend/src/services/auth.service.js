import * as authRepo from "../repositories/auth.repository.js"
import generateToken from "../utils/generateToken.js";

export const registerUser = async (userData)=>{
    const existingUser = await authRepo.findUserByEmail(userData.email)
    if(existingUser){
        throw new Error("User already Exist with this email");
    }

    const newUser = await authRepo.createUser(userData);
    return newUser;
}

// login service

export const loginUser = async ({email, password})=>{
    const user = await authRepo.findUserForLogin(email);
     if (!user){
        throw new Error("Invalid email or Password");
     }
     const isMatch = await user.comparePassword(password);
     if(!isMatch){
        throw new Error("Invalid email or Password");
     }
     user.lastLogin = new Date();
     await user.save();

     const token = generateToken(user);
     user.password = undefined;
     return {
        token,
        user
     }
}