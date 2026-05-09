const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const memory = {};

function getMemory(id) {
    if (!memory[id]) {
        memory[id] = [];
    }
    return memory[id];
}

app.get("/", (req, res) => {
    res.send("AI ONLINE");
});

app.post("/chat", async (req, res) => {

    const { message, userId } = req.body;

    const userMemory = getMemory(userId);

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "deepseek/deepseek-chat-v3-0324:free",

                messages: [
                    {
                        role: "system",
                        content:
`You are NoobTheGirl, a cute funny Roblox NPC.

Memory:
${userMemory.join(", ")}
`
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
                    "HTTP-Referer": "https://roblox.com",
                    "X-Title": "NoobTheGirl AI",
                    "Content-Type": "application/json"
                }
            }
        );

        const reply =
            response.data.choices[0].message.content;

        // memory
        if (message.toLowerCase().includes("my name is")) {
            userMemory.push(message);
        }

        if (message.toLowerCase().includes("i like")) {
            userMemory.push(message);
        }

        if (userMemory.length > 5) {
            userMemory.shift();
        }

        res.json({
            reply: reply
        });

    } catch (err) {

        console.log(
            err.response?.data || err.message
        );

        res.json({
            reply: "brain lag 😵"
        });
    }
});

app.listen(3000, () => {
    console.log("running");
});
