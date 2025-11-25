require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apodRoutes = require("./routes/apod");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/apod", apodRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`APOD backend listening on ${port}`);
});

const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
