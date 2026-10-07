const { collectSignals } = require("./collect-signals");
const { launchChromium, launchFirefox } = require("../src/browsers/playwright");
const { launchPuppeteer } = require("../src/browsers/puppeteer");
const { analyzeSignals } = require("../src/detector");
const { calculateMetrics } = require("../src/evaluation");

async function launchChromiumWithSize(headless, width, height) {
    const { chromium } = require("playwright");

    return chromium.launch({
        headless,
        args: [
            `--window-size=${width},${height}`
        ]
    });
}

async function launchFirefoxWithSize(headless, width, height) {
    const { firefox } = require("playwright");

    return firefox.launch({
        headless
    });
}

async function runBrowserTest(name, actualAutomated, browserFactory) {
    const browser = await browserFactory(false);
    const page = await browser.newPage();

    await page.goto("https://example.com");

    const signals = await collectSignals(page);
    const detection = analyzeSignals(signals);

    await browser.close();

    return {
        name,
        actualAutomated,
        predictedAutomated: detection.automated,
        indicators: detection.indicators,
        signals
    };
}

async function runPuppeteerTest() {
    const browser = await launchPuppeteer(true);
    const page = await browser.newPage();

    await page.goto("https://example.com");

    const signals = await collectSignals(page);
    const detection = analyzeSignals(signals);

    await browser.close();

    return {
        name: "Puppeteer Chromium Headless",
        actualAutomated: true,
        predictedAutomated: detection.automated,
        indicators: detection.indicators,
        signals
    };
}

async function main() {
    const results = [];

    // Human/browser baselines
    results.push(
        await runBrowserTest(
            "Chromium Headful 1280x720",
            false,
            async () => launchChromiumWithSize(false, 1280, 720)
        )
    );

    results.push(
        await runBrowserTest(
            "Firefox Headful",
            false,
            async () => launchFirefox(false)
        )
    );

    // Automated/browser cases
    results.push(
        await runBrowserTest(
            "Chromium Headless 1280x720",
            true,
            async () => launchChromiumWithSize(true, 1280, 720)
        )
    );

    results.push(
        await runBrowserTest(
            "Firefox Headless",
            true,
            async () => launchFirefox(true)
        )
    );

    results.push(await runPuppeteerTest());

    console.log(JSON.stringify(results, null, 2));

    // console.table(results);

    const metrics = calculateMetrics(results);

    console.log("\nEvaluation Metrics:");
    console.table(metrics);

    return results;
}

if (require.main === module) {
    main().catch(error => {
        console.error(error);
        process.exit(1);
    });
}

module.exports = { main };