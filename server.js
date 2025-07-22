import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import matchRouter from "./routes/matchRoute.js";
import teamRouter from "./routes/teamRoute.js";
import matchSummaryRouter from "./routes/matchSummaryRoute.js";

dotenv.config();

const app = express();
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.q4bst5v.mongodb.net/cricketApp?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started on port 8080");
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Routes
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/teams", teamRouter);
app.use("/api/match-summaries", matchSummaryRouter);

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Cricket Score Backend is running...");
});