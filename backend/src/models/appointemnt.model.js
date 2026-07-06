import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor is required"],
        },

        patient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: [true, "patient is required"],
        },

        appointmentDate: {
            type: Date,
            requrired: [true,"Appointment date is required"],
        },

        startTime: {
            type: String,
            required: [true, "Start time is required"],
        },
        endTime: {
            type: String,
            required: [true, "End time is required"],
        },

        status:{
            type: String,
            enum:["pending","confirmed","completed","cancelled"],
            default:"pending"
        },

        reason:{
            type: String,
            required: [true, "Reason is required"],
            trim: true,
        },

        notes:{
            type: String,
            trim: true,
            default:"",
        },

        consultationFee:{
            type: Number,
            default:0,
            min: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;