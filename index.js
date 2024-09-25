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
        throw error;
    }
};

app.post("/gemini", async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await callGemini(prompt);
        return res.status(200).json({ result });
    } catch (err) {
        console.error("Error in /gemini route:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});