import dotenv from "dotenv";

import app from "./app.js"; // import express app

import connectDB from "./config/db.js";
dotenv.config(); // load evironment variables from .env files

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
