const base64toblob = require("../bin/base64decoder");
const createBrowser = require("./browser");

function delay(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

async function isReady(page) {
  await page.waitForSelector("textarea");
  let element = await page.$("textarea");
  let value = await page.evaluate((el) => el.placeholder, element);

  console.log("Loading image...");

  if (!value.toLowerCase().includes("enter")) {
    await delay(5000);
    await isReady(page);
  } else {
    return;
  }
}

async function isAnswered(page) {
  await page.waitForSelector("div > .message.bot");
  let element = await page.$("div > .message.bot");
  let value = await page.evaluate((el) => el.textContent, element);

  console.log("Loading answer...");

  if (value == null || value == undefined || value.length < 5) {
    await delay(2000);
    await isAnswered(page);
  } else {
    return;
  }

  //   if (!value.length > 1) {
  //     await delay(2000);
  //     await isAnswered(page);
  //   } else {
  //     console.log("done : " + value);
  //     return;
  //   }
}

async function genCode(img) {
  const browser = await createBrowser();

  const pages = await browser.pages();

  const page = pages[0];

  await base64toblob(img);

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36"
    );
    await page.goto("https://vision-cair-minigpt4.hf.space/?__theme=light", {
      waitUntil: "load",
    });

    await page.waitFor(5000);

    // Wait until everything is loaded
    await page.waitForSelector("input[type='file']");

    // Set the value for the correct file input (last on the page is new post)
    let fileInputs = await page.$$('input[type="file"]');
    let input = fileInputs[fileInputs.length - 1];

    await input.uploadFile("./resized.jpg");

    await page.click("#component-8");

    await isReady(page);

    await page.type("textarea", "Describe the image", { delay: 100 });

    await page.keyboard.press("Enter");

    await isAnswered(page);

    let element = await page.$("div > .message.bot");
    let value = await page.evaluate((el) => el.textContent, element);

    return value;
  } catch (error) {
    console.log(error);
    return "ERROR";
  }
}

module.exports = genCode;
