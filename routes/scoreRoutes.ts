import express from "express";
import { calculateScore, getGameHistory } from "../controller/scoreController";

const router = express.Router();

// Calculate score for a new game
router.post("/calculate", calculateScore);

// Retrieve game history
router.get("/history", getGameHistory);

export default router;
