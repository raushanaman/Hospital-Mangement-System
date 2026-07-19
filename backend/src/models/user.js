import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "first Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName:{
        type: String,
        required: [true, "first Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        trim: true,
        
    },
    password:{
        type: String,
        required: [true, "Password is Required"],
        minlength: 6,
        select: false
    },
    phone:{
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
    },
    role:{
        type: String,
        default: "patient",
        enum: ["admin","doctor","receptionist","patient"],
        required: true
    },
    gender:{
        type: String,
        required: [true, "Gender is required"],
        enum: ["male","female","other"]
    },
    dateOfBirth:{
        type: Date,
    },
    ProfilePic:{
        type:String,
        default:"",
    },
    isActive:{
        type:Boolean,
        default:true
    },
    lastLogin:{
        type:Date,
        default: Date.now
    }
}, {
    timestamps:true,
});

// hash password method before saving to database
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
// compare password method during login below
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


const User = mongoose.model("User", userSchema);
export default User;