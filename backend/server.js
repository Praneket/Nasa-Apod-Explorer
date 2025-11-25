require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const apodRoutes = require("./routes/apod");

const app = express();
app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/apod", apodRoutes);

// SERVE FRONTEND (absolute path required on Render)
const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("Serving frontend from:", frontendPath);

app.use(express.static(frontendPath));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port", port);
});
