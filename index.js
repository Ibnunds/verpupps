const express = require("express");
const genCode = require("./api/genCode");
const ti = require("./api/ti");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there v6");
});

app.post("/gen", async (req, res) => {
  const { data } = req.body;
  const bot = await genCode(data);
  res.send(`Answer : ${bot}`);
});

app.post("/ti", async (req, res) => {
  const { data } = req.body;
  await ti(data);
  res.send("Gen IMG");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
