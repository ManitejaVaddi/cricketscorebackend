import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/userRoute.js";
import matchRouter from "./routes/matchRoute.js"; 
import teamRouter from "./routes/teamRoute.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

mongoose.connect(`mongodb://localhost:27017/cricketApp`).then(() => {
  app.listen(5000, () => {
    console.log("Server started on port 5000");
  });
}).catch((err) => {
  console.error(" DB connection failed:", err);
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter); 
app.use("/api/teams",teamRouter);  

