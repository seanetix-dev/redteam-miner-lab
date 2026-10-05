async function detectBrowser(page) {
    return await page.evaluate(() => {
        const signals = {
            webdriver: navigator.webdriver,
            userAgent: navigator.userAgent,
            languages: navigator.languages,
            plugins: navigator.plugins.length,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory ?? null,
            chromeObject: typeof window.chrome !== "undefined"
        };

        const indicators = [];

        if (navigator.webdriver === true) {
            indicators.push("navigator.webdriver");
        }

        if (/HeadlessChrome/i.test(navigator.userAgent)) {
            indicators.push("HeadlessChrome user agent");
        }

        if (navigator.plugins.length === 0) {
            indicators.push("no browser plugins");
        }

        return {
            automated: indicators.length > 0,
            indicators,
            signals
        };
    });
}

module.exports = {
    detectBrowser
};