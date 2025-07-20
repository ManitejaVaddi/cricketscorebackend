import express from "express";
import { createTeam, getAllTeams } from "../controllers/teamController.js";

const router = express.Router();

router.post("/", createTeam);        // POST /api/teams
router.get("/", getAllTeams);        // GET /api/teams

export default router;
