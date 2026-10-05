const { chromium } = require("playwright");
const { detectBrowser } = require("./detector");

async function testBrowser(headless) {
    const browser = await chromium.launch({
        headless
    });

    const page = await browser.newPage();

    await page.goto("https://example.com");

    const result = await detectBrowser(page);

    console.log(
        `\n=== ${headless ? "HEADLESS" : "NORMAL"} CHROMIUM ===`
    );

    console.log(JSON.stringify(result, null, 2));

    await browser.close();
}

(async () => {
    await testBrowser(false);
    await testBrowser(true);
})();