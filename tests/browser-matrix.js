const { chromium } = require("playwright");
const { detectBrowser } = require("../src/detector");
const { calculateMetrics } = require("../src/evaluation");

async function runCase(name, actualAutomated, launchOptions) {
    const browser = await chromium.launch(launchOptions);

    const page = await browser.newPage();

    await page.goto("https://example.com");

    const detection = await detectBrowser(page);

    await browser.close();

    return {
        name,
        actualAutomated,
        predictedAutomated: detection.automated,
        score: detection.indicators
    };
}

async function main() {
    const results = [];

    results.push(
        await runCase(
            "Chromium Headful",
            false,
            { headless: false }
        )
    );

    results.push(
        await runCase(
            "Chromium Headless",
            true,
            { headless: true }
        )
    );

    console.table(results);

    const metrics = calculateMetrics(results);

    console.log("\nEvaluation Metrics:");
    console.table(metrics);

    console.log(
        JSON.stringify(results, null, 2)
    );
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});