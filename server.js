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

app.post("/chat", async (req, res) => {

    const { message, userId } = req.body;

    const userMemory = getMemory(userId);

    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "model: "openai/gpt-3.5-turbo",",
                messages: [
                    {
                        role: "system",
                        content:
`You are NoobTheGirl, a funny Roblox NPC.

Memory about player:
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
                    "Content-Type": "application/json"
                }
            }
        );

        const reply =
            response.data.choices[0].message.content;

        // simple memory
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

        console.log(err.message);

        res.json({
            reply: "brain lag 😵"
        });
    }
});

app.get("/", (req, res) => {
    res.send("NoobTheGirl AI online");
});

app.listen(3000, () => {
    console.log("running");
});
