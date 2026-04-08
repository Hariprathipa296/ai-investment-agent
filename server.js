const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 Put your OpenRouter key here
const API_KEY = "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";

app.post("/getAdvice", async (req, res) => {

    const { name, age, income, investment, risk } = req.body;

    const prompt = `
    Give a detailed financial and business recommendation.

    Name: ${name}
    Age: ${age}
    Income: ${income}
    Investment: ${investment}
    Risk: ${risk}

    Include:
    - Business idea
    - Platform
    - Individual or team
    - Risks
    - Solutions
    - Future growth

    Give clear and simple explanation.
    `;

    try {

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("API Error:", data);
            return res.json({
                result: "⚠️ API Error - check console"
            });
        }

        res.json({
            result: data.choices[0].message.content
        });

    } catch (error) {
        console.log("Server Error:", error);
        res.json({
            result: "⚠️ Server error"
        });
    }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));