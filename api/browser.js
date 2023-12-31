const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");

async function createBrowser() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: process.env.CHROME || (await chromium.executablePath),
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
    ],
    ignoreDefaultArgs: ["--disable-extensions"],
    ignoreHTTPSErrors: true,
  });

  return browser;
}

module.exports = createBrowser;
