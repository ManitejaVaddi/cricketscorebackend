import express from "express";
import {
  createMatch,
  getAllMatches,
  tossMatch,
  updateScore,
  deleteMatch,
  saveMatchSummary,
  getMatchSummaries,
} from "../controllers/matchController.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/", auth, createMatch);
router.get("/", auth, getAllMatches);
router.post("/toss", auth, tossMatch);
router.put("/score", auth, updateScore);
router.delete("/:id", auth, deleteMatch);

router.post("/summary", auth, saveMatchSummary);
router.get("/summaries", auth, getMatchSummaries);

export default router;
