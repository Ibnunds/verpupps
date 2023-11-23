const express = require("express");
const genCode = require("./api/genCode");
const ti = require("./api/ti");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there v3");
});

app.get("/gen", async (req, res) => {
  const { img } = req.query;
  await genCode(img);
  res.send("Gen API");
});

app.post("/ti", async (req, res) => {
  const { data } = req.body;
  await ti(data);
  res.send("Gen IMG");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
