// server.js
import express from 'express';
import Groq from 'groq-sdk';
import cors from 'cors';


const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || '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' });

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: userMessage }],
            model: "llama3-8b-8192",
        });
        res.json({ answer: response.choices[0]?.message?.content || "No response received from AI." });
    } catch (error) {
        console.error("Error fetching AI response:", error);
        res.status(500).json({ error: "Error: Unable to fetch response from AI." });
    }
});

const PORT = process.env.PORT || 5505;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});