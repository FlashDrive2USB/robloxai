const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI ONLINE");
});

app.post("/chat", async (req, res) => {
    const message = req.body.message;

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",
                messages: [
                    {
                        role: "system",
                        content: "You are NoobTheGirl, a funny Roblox NPC."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            },
            {
                headers: {
                    "Authorization": "Bearer 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",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://render.com",
                    "X-Title": "RobloxAI"
                }
            }
        );

        const reply =
            response.data.choices[0].message.content;

        res.json({
            reply: reply
        });

    } catch (err) {

        console.log(err.response?.data || err.message);

        res.json({
            reply: "brain lag 😵"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("server running");
});
