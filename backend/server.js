require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const apodRoutes = require("./routes/apod");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------------------
// API ROUTES
// -------------------------------
app.use("/api/apod", apodRoutes);

// -------------------------------
// SERVE FRONTEND (Vite build)
// -------------------------------
const distPath = path.join(__dirname, "..", "frontend", "dist");

// Serve static files
app.use(express.static(distPath));

// Catch-all: send index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// -------------------------------
// START SERVER
// -------------------------------
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`APOD backend listening on ${port}`);
});
