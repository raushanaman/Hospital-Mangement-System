import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import doctorRoutes from "./routes/doctor.routes.js"
import patientRoutes from "./routes/patient.routes.js"
import appointmentRoutes from "./routes/appointment.routes.js"
import receptionistRoutes from "./routes/receptionist.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            "http://localhost:5173",
            process.env.FRONTEND_URL,
            process.env.FRONTEND_URL_PREVIEW,
        ].filter(Boolean);
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/receptionist", receptionistRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to HMS" });
});

export default app;
