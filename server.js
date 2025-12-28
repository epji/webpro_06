"use strict";

const express = require("express");
const path = require("path");

const fashionRouter = require("./routes/fashion");
// later you’ll add:
// const gamesRouter = require("./routes/games");
// const canelesRouter = require("./routes/caneles");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// mount routers
app.use("/fashion", fashionRouter);
// later:
// app.use("/games", gamesRouter);
// app.use("/caneles", canelesRouter);

// optional landing
app.get("/", (req, res) => res.redirect("/games"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
