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
