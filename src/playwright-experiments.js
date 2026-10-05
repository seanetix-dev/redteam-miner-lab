const { chromium } = require("playwright");
const { detectBrowser } = require("./detector");

async function experiment(name, options) {
    const browser = await chromium.launch(options);

    const page = await browser.newPage();

    await page.goto("https://example.com");

    const result = await detectBrowser(page);

    console.log(`\n=== ${name} ===`);
    console.log(JSON.stringify(result, null, 2));

    await browser.close();
}

(async () => {
    await experiment("Playwright Headless", {
        headless: true
    });

    await experiment("Playwright Headful", {
        headless: false
    });
})();