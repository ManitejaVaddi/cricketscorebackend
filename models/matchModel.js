import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    teamA: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    teamB: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
    overs: { type: Number, required: true },
    location: { type: String, required: true }, 
    date: { type: Date, required: true },      
    tossWinner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    tossDecision: { type: String, enum: ["bat", "bowl"] },
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },
    oversA: { type: Number, default: 0 },
    oversB: { type: Number, default: 0 },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    status: { type: String, enum: ["pending", "ongoing", "completed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Match", matchSchema);
