const {
    calculateScore,
    classifyScore
} = require("../src/scoring");

describe("Detection scoring", () => {

    test("high confidence automation", () => {
        const score = calculateScore([
            "navigator.webdriver",
            "HeadlessChrome user agent"
        ]);

        expect(score).toBe(80);
        expect(classifyScore(score)).toBe("high-risk");
    });

    test("single weak signal", () => {
        const score = calculateScore([
            "no browser plugins"
        ]);

        expect(score).toBe(10);
        expect(classifyScore(score)).toBe("low-risk");
    });

});