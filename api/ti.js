const base64toblob = require("../bin/base64decoder");

async function ti(img) {
  try {
    base64toblob(img);
  } catch (error) {
    console.log(error);
  }
}

module.exports = ti;
