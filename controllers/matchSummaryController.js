import MatchSummary from "../models/matchSummaryModel.js";

export const saveMatchSummary = async (req, res) => {
  try {
    const newSummary = new MatchSummary(req.body);
    const saved = await newSummary.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to save summary", error });
  }
};

export const getMatchSummaries = async (req, res) => {
  try {
    const summaries = await MatchSummary.find().sort({ createdAt: -1 });
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch summaries", error });
  }
};
