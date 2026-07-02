import express from "express";

// import helmet from "helmet";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use(cors());
// app.use(helmet());
// app.use(morgan("dev"));

// app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to HMS"
    })
})
export default app;