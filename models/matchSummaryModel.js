// models/matchSummaryModel.js
import mongoose from "mongoose";

const ballSchema = new mongoose.Schema({
  over: Number,
  ball: Number,
  runs: Number,
  batsman: String,
  bowler: String,
  wicket: Boolean,
  comment: String,
});

const inningsSchema = new mongoose.Schema({
  team: String,
  totalRuns: Number,
  wickets: Number,
  overs: Number,
  balls: [ballSchema],
});

const matchSummarySchema = new mongoose.Schema(
  {
    matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },
    teamA: String,
    teamB: String,
    scoreA: Number,
    scoreB: Number,
    oversA: Number,
    oversB: Number,
    winner: String,
    tossWinner: String,
    tossDecision: String,
    date: Date,
    location: String,
    innings: [inningsSchema],          // ✅ NEW
  },
  { timestamps: true }
);

export default mongoose.model("MatchSummary", matchSummarySchema);
