const { ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const fs = require('fs');
const path = require('path');

// Initialize LangChain Model (Outside handler for potential caching)
const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.7,
    apiKey: process.env.OPENAI_API_KEY
});

// Import data directly (Bundled with function)
const {
    studentData,
    roadmapData,
    portfolioData,
    komdigiData,
    fullStackData,
    techStackData,
    blogData,
    advancedGenAIData
} = require('./data.js');

// Function to construct context string
function getContext() {
    return JSON.stringify({
        studentData,
        roadmapData,
        portfolioData,
        komdigiData,
        fullStackData,
        techStackData,
        blogData,
        advancedGenAIData
    }, null, 2);
}

// Define Prompt Template (Copied from server.js)
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

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message } = req.body;
        const contextData = getContext();

        const response = await chain.invoke({
            context: contextData,
            input: message
        });

        res.status(200).json({ reply: response });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({
            error: "Failed to generate response.",
            details: error.message,
            cwd: process.cwd(),
            pathAttempted: path.join(process.cwd(), 'public', 'js', 'data.js')
        });
    }
}
