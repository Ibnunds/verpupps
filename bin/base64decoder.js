const Jimp = require("jimp");
const fs = require("fs");

async function base64toblob(base64) {
  const norm = base64.replace(/^data:image\/png;base64,/, "");
  const buffer = Buffer.from(norm, "base64");
  Jimp.read(buffer, (err, res) => {
    if (err) throw new Error(err);
    res.quality(8).write("saved.png");
  });
  //fs.writeFileSync("./saved.png", buffer);
}

module.exports = base64toblob;
