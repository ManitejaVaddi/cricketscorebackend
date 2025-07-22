import Match from "../models/matchModel.js";
import Team from "../models/teamModel.js";
import MatchSummary from "../models/matchSummaryModel.js";

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

    let match = await Match.findByIdAndUpdate(matchId, update, { new: true });

    if (
      match.oversA >= match.overs &&
      match.oversB >= match.overs &&
      match.scoreA !== null &&
      match.scoreB !== null &&
      match.status !== "completed"
    ) {

      match.status = "completed";

      if (match.scoreA > match.scoreB) {
        match.winner = match.teamA;
      } else if (match.scoreB > match.scoreA) {
        match.winner = match.teamB;
      } else {
        match.winner = null; 
      }

      await match.save();

      const existing = await MatchSummary.findOne({ matchId });
      if (!existing) {
        const populated = await Match.findById(matchId).populate("teamA teamB winner tossWinner");

        const summary = new MatchSummary({
          matchId: populated._id,
          teamA: populated.teamA.name,
          teamB: populated.teamB.name,
          scoreA: populated.scoreA,
          scoreB: populated.scoreB,
          oversA: populated.oversA,
          oversB: populated.oversB,
          winner: populated.winner?.name || "Draw",
          tossWinner: populated.tossWinner?.name || "N/A",
          tossDecision: populated.tossDecision || "N/A",
          date: populated.date,
          location: populated.location || "N/A",
        });

        await summary.save();
        console.log(" Match summary saved");
      }
    }

    res.status(200).json(match);
  } catch (err) {
    console.error("Update Score Error:", err);
    res.status(500).json({ message: "Failed to update score" });
  }
};

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

export const saveMatchSummary = async (req, res) => {
  try {
    const { matchId } = req.body;

    const match = await Match.findById(matchId).populate("teamA teamB winner tossWinner");

    if (!match) return res.status(404).json({ message: "Match not found" });

    const existing = await MatchSummary.findOne({ matchId });
    if (existing) return res.status(400).json({ message: "Summary already exists" });

    const summary = new MatchSummary({
      matchId: match._id,
      teamA: match.teamA.name,
      teamB: match.teamB.name,
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      oversA: match.oversA,
      oversB: match.oversB,
      winner: match.winner?.name || "Draw",
      tossWinner: match.tossWinner?.name || "N/A",
      tossDecision: match.tossDecision || "N/A",
      date: match.date,
      location: match.location || "N/A",
    });

    await summary.save();
    res.status(201).json(summary);
  } catch (error) {
    console.error("Error saving summary:", error);
    res.status(500).json({ message: "Failed to save summary", error });
  }
};

export const getMatchSummaries = async (req, res) => {
  try {
    const summaries = await MatchSummary.find().sort({ date: -1 });
    res.status(200).json(summaries);
  } catch (err) {
    console.error("Get Match Summaries Error:", err);
    res.status(500).json({ message: "Error fetching summaries" });
  }
};
