const express = require("express");
const sampleAPI = require("./api/sample");
const genCode = require("./api/genCode");
const ti = require("./api/ti");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/gen", async (req, res) => {
  await genCode();
  res.send("Gen API");
});

app.get("/ti", async (req, res) => {
  const { img } = req.query;
  await ti(img);
  res.send("Gen IMG");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
