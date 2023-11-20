const createBrowser = require("./browser");

async function sampleAPI() {
  try {
    const browser = await createBrowser();

    await page.goto("https://www.freecodecamp.org/");

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

module.exports = sampleAPI;
