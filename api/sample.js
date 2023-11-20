const createBrowser = require("./browser");

async function sampleAPI() {
  try {
    const browser = await createBrowser();

    const page = await browser.newPage();

    await page.goto("https://www.freecodecamp.org/");

    await page.screenshot({ path: "ss.png" });

    await browser.close();
  } catch (error) {
    console.log(error);
  }
}

module.exports = sampleAPI;
