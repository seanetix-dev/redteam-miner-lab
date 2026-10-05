function analyzeSignals(signals) {
    const indicators = [];

    if (signals.webdriver === true) {
        indicators.push("navigator.webdriver");
    }

    if (/HeadlessChrome/i.test(signals.userAgent || "")) {
        indicators.push("HeadlessChrome user agent");
    }

    if (signals.plugins === 0) {
        indicators.push("no browser plugins");
    }

    return {
        automated: indicators.length > 0,
        indicators
    };
}

async function detectBrowser(page) {
    const start = performance.now();

    const signals = await page.evaluate(() => ({
        webdriver: navigator.webdriver,
        userAgent: navigator.userAgent,
        languages: navigator.languages,
        plugins: navigator.plugins.length,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory ?? null,
        chromeObject: typeof window.chrome !== "undefined"
    }));

    const result = analyzeSignals(signals);

    const elapsedMs = performance.now() - start;

    return {
        ...result,
        signals,
        elapsedMs
    };
}

module.exports = {
    analyzeSignals,
    detectBrowser
};