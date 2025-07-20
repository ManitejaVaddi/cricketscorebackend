import express from "express";
import {
  createMatch,
  getAllMatches,
  tossMatch,
  updateScore,
  deleteMatch,
} from "../controllers/matchController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create a new match
router.post("/", auth, createMatch);

// Get all matches
router.get("/", auth, getAllMatches);

// Toss: choose team who won the toss
router.post("/toss", auth, tossMatch);

// Update score: runs, wickets, overs, etc.
router.put("/score", auth, updateScore);

// Delete a match
router.delete("/:id", auth, deleteMatch);

export default router;
