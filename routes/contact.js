const express = require("express");
const fs = require("fs");

const router = express.Router();

let messages = [];

try {
    const date = fs.readFileSync("messages.json", "utf8");
    messages = JSON.parse(date);
} catch (error) {
    console.error("Filed to read messages.json:", error);
    messages = [];
}

router.post("/", (req, res) => {

    const {name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Invalid email format"
        });
    }

    const newMessage = {
        id: Date.now(),
        name,
        email,
        message
    };

    messages.push(newMessage);

    try {
        fs.writeFileSync(
            "messages.json",
            JSON.stringify(messages, null, 2)
        );
    } catch (error) {
        console.error("Failed to save messages:", error);
        return res.status(500).json({
            error: "Failed to save message"
        });
    }

    res.json({ success: true });

});

router.get("/", (req, res) => {

    const sortedMessages = [...messages].sort((a, b) => b.id - a.id);

    res.json(sortedMessages);

});

router.delete("/:id", (req, res) => {

    const id = Number(req.params.id);

    messages = messages.filter(msg => msg.id !== id);

    try {
        fs.writeFileSync(
            "messages.json",
            JSON.stringify(messages, null, 2)
        );
    } catch (error) {
        console.error("Delete save failed:", error);
        return res.status(500).json({
            error: "Failed to delete message"
        });
    }

    res.json({ success: true });

});

module.exports = router;