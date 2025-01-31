const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middlewares/auth");
const {addCandidate, updateCandidate, deleteCandidate, voteForCandidate, voteCount, listCandidates} = require("../controllers/candidateController");

// POST route to add a candidate
router.post("/", jwtAuthMiddleware, addCandidate);

// PUT route to update a candidate
router.put("/:candidateID", jwtAuthMiddleware, updateCandidate);

// DELETE route to remove a candidate
router.delete("/:candidateID", jwtAuthMiddleware, deleteCandidate);

// GET route to vote for a candidate
router.get("/vote/:candidateID", jwtAuthMiddleware, voteForCandidate);

// GET route to count votes
router.get("/vote/count", voteCount);

// GET route to list all candidates
router.get("/", listCandidates);

module.exports = router;
