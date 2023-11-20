const express = require("express");
const sampleAPI = require("./api/sample");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.get("/sample", async (req, res) => {
  await sampleAPI();
  res.send("Sample API");
});

app.listen(3000, () => {
  console.log("Listen on the port 3000...");
});
