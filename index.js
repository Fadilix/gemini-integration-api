const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.get("/", (req, res) => {
    return res.status(200).json({ msg: "This is a gemini integration api" });
});

const callGemini = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error calling Gemini:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        throw error;
    }
};

app.post("/gemini", async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
    }
    try {
        const result = await callGemini(prompt);
        return res.status(200).json({ result });
    } catch (err) {
        console.error("Error in /gemini route:", err);
        console.error("Error details:", JSON.stringify(err, null, 2));
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
});

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});