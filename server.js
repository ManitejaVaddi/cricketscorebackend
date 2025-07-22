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

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/cricketApp";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected");
    app.listen(5000, () => {
      console.log(" Server started on http://localhost:5000");
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message);
  });

app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/teams", teamRouter);
app.use("/api/match-summaries", matchSummaryRouter); 

app.get("/", (req, res) => {
  res.send(" Cricket Score Backend is running...");
});

