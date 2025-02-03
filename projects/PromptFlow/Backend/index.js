import "dotenv/config";
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

import cors from "cors";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: FRONTEND_URL, credentials: true }));

const { GOOGLE_API_KEY, PORT = 3000 } = process.env;

if (!GOOGLE_API_KEY) {
  console.error("Error: GOOGLE_API_KEY is not set.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content.");
  }
};

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/content", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing 'question' field in request body." });
    }

    const response = await generateContent(question);
    res.json({ result: response });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
