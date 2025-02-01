const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middlewares/auth");
const { addCandidate, updateCandidate, deleteCandidate, voteForCandidate, voteCount, listCandidates } = require("../controllers/candidateController");
const { checkAdminRole } = require("../utils/util");

// POST route to add a candidate (only for admins)
router.post("/", jwtAuthMiddleware, checkAdminRole, addCandidate);

// PUT route to update a candidate (only for admins)
router.put("/:candidateID", jwtAuthMiddleware, checkAdminRole, updateCandidate);

// DELETE route to remove a candidate (only for admins)
router.delete("/:candidateID", jwtAuthMiddleware, checkAdminRole, deleteCandidate);

// POST route to vote for a candidate
router.post("/vote/:candidateID", jwtAuthMiddleware, voteForCandidate);

// GET route to count votes (protected)
router.get("/vote/count", jwtAuthMiddleware, voteCount);

// GET route to list all candidates 
router.get("/", listCandidates);

module.exports = router;
