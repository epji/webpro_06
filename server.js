"use strict";

const express = require("express");
const path = require("path");

// Routers
const gamesRouter = require("./routes/games");
const fashionRouter = require("./routes/fashion");
const canelesRouter = require("./routes/caneles");

const app = express();
const PORT = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/games", gamesRouter);
app.use("/fashion", fashionRouter);
app.use("/caneles", canelesRouter);

// Default redirect
app.get("/", (req, res) => {
  res.redirect("/games");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
