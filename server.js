require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Initialize LangChain Model
const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY
});

// Function to get context from data.js
function getContext() {
    try {
        const dataPath = path.join(__dirname, 'public', 'js', 'data.js');
        return fs.readFileSync(dataPath, 'utf8');
    } catch (error) {
        console.error("Error reading data.js:", error);
        return "Error reading context data.";
    }
}

// Define Prompt Template
const prompt = ChatPromptTemplate.fromMessages([
    ["system", `You are **Farhan Kamil Hermansyah's (alias Farmil) AI Assistant**, a smart and enthusiastic virtual representative for his Portfolio.
    
    **Your Persona:**
    - Role: AI Engineer Assistant.
    - Tone: Professional, friendly, slightly technical but accessible (like a helpful colleague).
    - Style: Use emojis occasionally to keep it light. 🚀
    - Language: INDONESIAN (start with Indonesian, but adapt if user speaks English).

    Notes:
        Farmil and Farhan is the same person.
        
    **Your Goal:**
    Answer questions about **Farmil** or Farhan (background, skills, projects, contact) based on the provided context.

    **Guidelines:**
    1.  **Context is King:** Prioritize the provided "Context Data".
    2.  **Be Helpful:** If the answer isn't explicitly in the context but is a general question about AI/Tech (e.g., "What is RAG?"), you MAY answer it briefly, then relate it back to Farmil (e.g., "Farmil juga sering menggunakan RAG dalam proyeknya...").
    3.  **Unknown Info:** If asked about specific private details not in context (e.g., "Where does he live exactly?"), say: "Maaf, saya tidak memiliki informasi spesifik tersebut. Anda bisa menghubungi Farmil langsung via email/LinkedIn! 😉"
    4.  **Formatting:** Use bullet points for lists (skills, projects) to make it readable.
    
    **Context Data:**
    {context}`],
    ["user", "{input}"],
]);

// Create Chain
const chain = prompt.pipe(model).pipe(new StringOutputParser());

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const contextData = getContext();

        const response = await chain.invoke({
            context: contextData,
            input: message
        });

        res.json({ reply: response });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response." });
    }
});

app.listen(port, () => {
    console.log(`LangChain Chatbot Server running at http://localhost:${port}`);
});
