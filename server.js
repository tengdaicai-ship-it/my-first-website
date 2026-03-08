const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

let messages = [];

try {
  const date = fs.readFileSync("messages.json", "utf8");
  messages = JSON.parse(date);
} catch (error) {
  console.error("Failed to read messages.json:", error);
  messages = [];
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contact", (req, res) => {

  const { name, email, message } = req.body;

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

app.get("/api/contact", (req, res) => {

  res.json(messages);

});

app.delete("/api/contact/:id", (req, res) => {

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
      error: "Failed to dalete message"
    });
  }

  res.json({ success: true });

});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});