
const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// Generate Blog
router.post("/generate-blog", async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({
                message: "Topic is required"
            });
        }

        const prompt = `
Write a complete blog article about "${topic}".

Include:
1. An attractive title
2. Introduction
3. Main content with headings
4. Conclusion

Write in simple and clear English.
`;

        const response = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: prompt
        });

        res.json({
            message: "Blog generated successfully",
            topic: topic,
            blog: response.output_text
        });

    } catch (error) {
        res.status(500).json({
            message: "AI blog generation failed",
            error: error.message
        });
    }
});


// Summarize Blog
router.post("/summarize", async (req, res) => {
    try {
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({
                message: "Blog content is required"
            });
        }

        const prompt = `
Summarize the following blog content in 5 simple points:

${content}
`;

        const response = await ai.interactions.create({
            model: "gemini-3.8-flash",
            input: prompt
        });

        res.json({
            message: "Blog summarized successfully",
            summary: response.output_text
        });

    } catch (error) {
        res.status(500).json({
            message: "AI summarization failed",
            error: error.message
        });
    }
});


module.exports = router;