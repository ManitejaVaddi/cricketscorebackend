import express from "express";
import { saveMatchSummary, getMatchSummaries } from "../controllers/matchSummaryController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, saveMatchSummary);
router.get("/", auth, getMatchSummaries);

export default router;
