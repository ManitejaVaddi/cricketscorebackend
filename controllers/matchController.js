import Match from "../models/matchModel.js";
import Team from "../models/teamModel.js";
export const createMatch = async (req, res) => {
  try {
    const { teamA, teamB, overs, location, date } = req.body;
    const match = await Match.create({ teamA, teamB, overs, location, date });
    res.status(201).json(match);
  } catch (err) {
    console.error("Create Match Error:", err);
    res.status(500).json({ message: "Failed to create match" });
  }
};

// Get All Matches
export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate("teamA")
      .populate("teamB")
      .populate("tossWinner")
      .populate("winner");
    res.status(200).json(matches);
  } catch (err) {
    console.error("Fetch Matches Error:", err);
    res.status(500).json({ message: "Failed to fetch matches" });
  }
};

// Toss Selection
export const tossMatch = async (req, res) => {
  try {
    const { matchId, teamId, decision } = req.body;
    const match = await Match.findByIdAndUpdate(
      matchId,
      { tossWinner: teamId, tossDecision: decision },
      { new: true }
    );
    res.status(200).json(match);
  } catch (err) {
    console.error("Toss Error:", err);
    res.status(500).json({ message: "Toss failed" });
  }
};

// Update Score
export const updateScore = async (req, res) => {
  try {
    const { matchId, team, score, overs } = req.body;
    const update = {};
    if (team === "A") {
      update.scoreA = score;
      update.oversA = overs;
    } else if (team === "B") {
      update.scoreB = score;
      update.oversB = overs;
    }

    const match = await Match.findByIdAndUpdate(matchId, update, { new: true });
    res.status(200).json(match);
  } catch (err) {
    console.error("Update Score Error:", err);
    res.status(500).json({ message: "Failed to update score" });
  }
};

// Delete Match
export const deleteMatch = async (req, res) => {
  try {
    const id = req.params.id;
    const match = await Match.findByIdAndDelete(id);
    res.status(200).json(match);
  } catch (err) {
    console.error("Delete Match Error:", err);
    res.status(500).json({ message: "Failed to delete match" });
  }
};
