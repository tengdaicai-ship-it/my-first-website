const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

const messages = []

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message
  };    

  messages.push(newMessage);

  console.log("Saved:", newMessage);

  res.json({ status: "success" });
});

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
