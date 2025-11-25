require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apodRoutes = require("./routes/apod");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/apod", apodRoutes);

// SERVE FRONTEND BUILD
const distPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`APOD backend listening on ${port}`);
});
