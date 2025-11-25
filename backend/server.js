require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const apodRoutes = require("./routes/apod");

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/apod", apodRoutes);

// Serve frontend
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`APOD backend listening on ${port}`);
});
