const express = require("express");
const path = require("path");

const contactRoutes = require("./routes/contact");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});