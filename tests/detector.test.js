const { analyzeSignals } = require("../src/detector");
const { humanChrome, headlessChrome } = require("./fixtures");

describe("Browser automation detector", () => {
    test("does not classify normal Chrome as automated", () => {
        const result = analyzeSignals(humanChrome);

        expect(result.automated).toBe(false);
        expect(result.indicators).toHaveLength(0);
    });

    test("does not classify webdriver alone as automated", () => {
        const signals = {
            ...humanChrome,
            webdriver: true
        };

        const result = analyzeSignals(signals);

        expect(result.automated).toBe(false);
        expect(result.indicators).toContain("navigator.webdriver");
    });

    test("detects multiple strong automation signals", () => {
        const result = analyzeSignals(headlessChrome);

        expect(result.automated).toBe(true);
        expect(result.indicators).toContain("navigator.webdriver");
        expect(result.indicators).toContain("HeadlessChrome user agent");
        expect(result.indicators).toContain("no browser plugins");
    });

    test("does not classify HeadlessChrome user agent alone as automated", () => {
        const signals = {
            ...humanChrome,
            userAgent: "Mozilla/5.0 HeadlessChrome/154.0.0.0"
        };

        const result = analyzeSignals(signals);

        expect(result.automated).toBe(false);
        expect(result.indicators).toContain("HeadlessChrome user agent");
    });

    test("does not classify missing plugins alone as automated", () => {
        const signals = {
            ...humanChrome,
            plugins: 0
        };

        const result = analyzeSignals(signals);

        expect(result.automated).toBe(false);
        expect(result.indicators).toContain("no browser plugins");
    });

    test("detects Firefox headless from combined signals", () => {
        const signals = {
            ...humanChrome,
            webdriver: true,
            userAgent:
                "Mozilla/5.0 (X11; Linux x86_64; rv:155.0) Gecko/20100101 Firefox/155.0",
            plugins: 0,
            outerWidth: 1280,
            outerHeight: 806,
            innerWidth: 1280,
            innerHeight: 720
        };
    
        const result = analyzeSignals(signals);
    
        expect(result.automated).toBe(true);
        expect(result.score).toBe(40);
    });

    test("does not classify Firefox headful from webdriver and plugins alone", () => {
        const signals = {
            ...humanChrome,
            webdriver: true,
            userAgent:
                "Mozilla/5.0 (X11; Linux x86_64; rv:155.0) Gecko/20100101 Firefox/155.0",
            plugins: 0,
            outerWidth: 1332,
            outerHeight: 857,
            innerWidth: 1280,
            innerHeight: 720
        };
    
        const result = analyzeSignals(signals);
    
        expect(result.automated).toBe(false);
        expect(result.score).toBe(20);
    });
});