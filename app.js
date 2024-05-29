"use strict";

import express from "express";
import deviceRouter from "./routes/deviceRouter.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create an express application - web service called app
const app = express();
app.use(express.json());

// middleware - lies between the request and response
// Use the deviceRouter for routes starting with /api/devices
app.use("/api/devices", deviceRouter);


//const PORT = 8000;
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
const DB = process.env.DATABASE_URL;
mongoose.connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

