const Jimp = require("jimp");
const fs = require("fs");

async function base64toblob(base64) {
  const buffer = Buffer.from(base64, "base64");
  Jimp.read(buffer, (err, res) => {
    if (err) throw new Error(err);
    res.quality(5).write("resized.jpg");
  });
}

module.exports = base64toblob;
