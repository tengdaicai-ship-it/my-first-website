const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

let messages = JSON.parse(
  fs.readFileSync("messages.json", "utf8")
);

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

  fs.writeFileSync(
    "messages.json",
    JSON.stringify(messages, null, 2)
  );

  res.json({ success: true });

});

app.get("/api/contact", (req, res) => {

  res.json(messages);

});

app.delete("/api/contact/:id", (req, res) => {

  const id = Number(req.params.id);

  messages = messages.filter(msg => msg.id !== id);

  fs.writeFileSync(
    "messages.json",
    JSON.stringify(messages, null, 2)
  );

  res.json({ success: true });

});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});