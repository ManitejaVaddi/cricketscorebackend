import mongoose from "mongoose";

const matchSummarySchema = new mongoose.Schema({
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
});

export default mongoose.model("MatchSummary", matchSummarySchema);
