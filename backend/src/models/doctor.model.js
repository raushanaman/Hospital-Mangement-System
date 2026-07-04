import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

            unique:true,
        },
        specialization: {
            type: String,
            required: true,
            trime: true,
        },

        department:{
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: Number,
            required: true,
            min: 0,
        },

        consultationFee:{
            type: Number,
            required: true,
            min: 0,
        },


        licenseNumber:{
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        availability:{
            type: Boolean,
            default: true,
        },
        workingDays:{
            type: [String],
            default:[],
        },

        startTime:{
            type:String,

        },
        endTime:{
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;