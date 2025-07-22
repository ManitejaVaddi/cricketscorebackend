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
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// MongoDB Connection

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.q4bst5v.mongodb.net/cricketApp?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started");
    });
  });

app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/teams", teamRouter);
app.use("/api/match-summaries", matchSummaryRouter); 

app.get("/", (req, res) => {
  res.send(" Cricket Score Backend is running...");
});

