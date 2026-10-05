const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { detectBrowser } = require("./detector");
const {
    calculateScore,
    classifyScore
} = require("./scoring");

async function runExperiment(name, launchOptions) {
    const browser = await chromium.launch(launchOptions);

    const page = await browser.newPage();

    await page.goto("https://example.com");

    const detection = await detectBrowser(page);

    const score = calculateScore(detection.indicators);

    const result = {
        experiment: name,
        timestamp: new Date().toISOString(),
        detection,
        score,
        classification: classifyScore(score)
    };

    await browser.close();

    return result;
}

async function main() {
    const results = [];

    results.push(
        await runExperiment("chromium-headful", {
            headless: false
        })
    );

    results.push(
        await runExperiment("chromium-headless", {
            headless: true
        })
    );

    const outputDir = path.join(__dirname, "..", "benchmarks");

    fs.mkdirSync(outputDir, {
        recursive: true
    });

    const outputFile = path.join(
        outputDir,
        "results.json"
    );

    fs.writeFileSync(
        outputFile,
        JSON.stringify(results, null, 2)
    );

    console.log(`Results written to ${outputFile}`);
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});