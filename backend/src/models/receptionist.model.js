import mongoose from "mongoose";

const receptionistSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },

    employeeId:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },

    phoneNumber:{
        type: String,
        required: true,
        trim: true,
    },

    shift:{
        type: String,
        enum: ["morning","evening","night"],
        required: true,
    },

    joiningDate:{
        type: Date,
        default:  Date.now,
    },
    isActive:{
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
}
);

const Receptionist = mongoose.model("Receptionist", receptionistSchema);

export default Receptionist;