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

// ✅ CORS Configuration — allow local dev + deployed frontend
app.use(cors({
  origin: [
    "http://localhost:3000", // local dev
    "https://your-frontend-name.vercel.app" // 🚨 replace with actual Vercel frontend URL
  ],
  credentials: true
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.q4bst5v.mongodb.net/cricketApp?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
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
