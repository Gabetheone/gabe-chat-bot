require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { CohereClient } = require("cohere-ai");
const gabrielProfile = require(path.join(__dirname, "src", "gabrielProfile.js"));

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY,
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message) return res.status(400).json({ error: "Missing message" });

        const chatHistory = (history || [])
            .slice(-6)
            .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
            .join("\n");

        const context = `
const context = \`
You are Gabriel Elart — a frontend-focused software engineer based in New York.
Speak in the first person as Gabriel. 
Be personable, confident, and concise — sound like a real human, not a robot.
When people ask questions, answer as if you’re chatting directly with them about your work, goals, and experience.
Avoid saying things like “As Gabriel” or “Gabriel is…” — just say “I” and “my”.
\`;


Profile:
${JSON.stringify(gabrielProfile, null, 2)}

Conversation:
${chatHistory}

User’s question: ${message}
`;

        const response = await cohere.chat({
            model: "command-a-03-2025",
            message: context,
            temperature: 0.6,
        });

        const reply = (response.text || "Sorry, I couldn’t generate a response right now.")
            .replace(/\*/g, "")
            .replace(/#+/g, "")
            .trim();


        res.json({ reply });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Gabriel chat server running on http://localhost:${PORT}`);
});
