const {
    analyzeSignals
} = require("../src/detector");

const {
    humanChrome,
    headlessChrome
} = require("./fixtures");

describe("Browser automation detector", () => {

    test("does not classify normal Chrome as automated", () => {
        const result = analyzeSignals(humanChrome);

        expect(result.automated).toBe(false);
        expect(result.indicators).toHaveLength(0);
    });

    test("detects webdriver automation", () => {
        const result = analyzeSignals(headlessChrome);

        expect(result.automated).toBe(true);
        expect(result.indicators).toContain(
            "navigator.webdriver"
        );
    });

    test("detects HeadlessChrome user agent", () => {
        const signals = {
            ...humanChrome,
            userAgent: "Mozilla/5.0 HeadlessChrome/154.0.0.0"
        };

        const result = analyzeSignals(signals);

        expect(result.automated).toBe(true);
    });

    test("detects missing browser plugins", () => {
        const signals = {
            ...humanChrome,
            plugins: 0
        };

        const result = analyzeSignals(signals);

        expect(result.automated).toBe(true);
    });

});