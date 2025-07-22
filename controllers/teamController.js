import Team from "../models/teamModel.js";

export const createTeam = async (req, res) => {
  try {
    const { name } = req.body;
    const team = await Team.create({ name });
    res.status(201).json(team);
  } catch (err) {
    console.error("Create Team Error:", err);
    res.status(500).json({ message: "Failed to create team" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    console.error("Fetch Teams Error:", err);
    res.status(500).json({ message: "Failed to fetch teams" });
  }
};
