const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// JSONを受け取れるようにする
app.use(express.json());

// publicフォルダを静的配信
app.use(express.static(path.join(__dirname, "public")));

// テストAPI
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});