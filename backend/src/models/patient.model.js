import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
            unique: true,    
        },

        dateOfBirth:{
            type: Date,
            required: true,
        },

        gender:{
            type: String,
            required:true,
            enum: ["Male", "Female", "Other"],
        },

        bloodGroup:{
            type: String,
            enum:[
                "A+",
                 "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
            ],
            required: true,
        },
        height:{
            type: Number,
            min: 0,
        },
        weight:{
            type: Number,
            min:0,
        },

        address:{
            type: String,
            trim: true,
        },
        emergencyContact:{
            type: String,
            trim: true,
            required: true,
        },
         allergies: {
            type: [String],
            default: [],
        },

        medicalHistory: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
)

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;