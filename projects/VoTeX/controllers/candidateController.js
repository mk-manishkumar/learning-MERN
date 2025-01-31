const User = require("../models/user.model");
const Candidate = require("../models/candidates.model");
const { checkAdminRole } = require("../utils/util");


// ========================= ADDING A NEW CANDIDATE =========================
const addCandidate = async (req, res) => {
  try {
    const candidateData = req.body;
    const candidate = new Candidate(candidateData);
    const response = await candidate.save();

    console.log("Data saved");
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================= UPDATING A CANDIDATE =========================
const updateCandidate = async (req, res) => {
  try {
    const candidateID = req.params.candidateID;
    const updatedCandidateData = req.body;

    const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
      new: true,
      runValidators: true,
    });

    if (!response) return res.status(404).json({ error: "Candidate not found" });

    console.log("Candidate data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================= DELETING A CANDIDATE =========================
const deleteCandidate = async (req, res) => {
  try {
    const candidateID = req.params.candidateID;
    const response = await Candidate.findByIdAndDelete(candidateID);

    if (!response) return res.status(404).json({ error: "Candidate not found" });

    console.log("Candidate deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ========================= VOTING FOR A CANDIDATE =========================
const voteForCandidate = async (req, res) => {
  const candidateID = req.params.candidateID;
  const userId = req.user.id;

  try {
    const candidate = await Candidate.findById(candidateID);
    if (!candidate) return res.status(404).json({ message: "Candidate not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Admin is not allowed" });
    if (user.isVoted) return res.status(400).json({ message: "You have already voted" });

    candidate.votes.push(userId);
    candidate.voteCount++;
    await candidate.save();

    user.isVoted = true;
    await user.save();

    return res.status(200).json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// =========================== VOTE COUNT ===========================
const voteCount = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    const voteRecord = candidates.map((data) => ({ party: data.party, count: data.voteCount }));
    return res.status(200).json(voteRecord);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// =========================== LIST ALL CANDIDATES ===========================
const listCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find({}, "name party -_id");
    res.status(200).json(candidates);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  deleteCandidate,
  voteForCandidate,
  voteCount,
  listCandidates,
};
