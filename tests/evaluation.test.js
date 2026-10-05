const {
    calculateMetrics
} = require("../src/evaluation");

describe("Detection evaluation", () => {

    test("calculates perfect detection", () => {
        const results = [
            {
                actualAutomated: true,
                predictedAutomated: true
            },
            {
                actualAutomated: false,
                predictedAutomated: false
            }
        ];

        const metrics = calculateMetrics(results);

        expect(metrics.truePositive).toBe(1);
        expect(metrics.trueNegative).toBe(1);
        expect(metrics.falsePositive).toBe(0);
        expect(metrics.falseNegative).toBe(0);

        expect(metrics.accuracy).toBe(1);
        expect(metrics.precision).toBe(1);
        expect(metrics.recall).toBe(1);
        expect(metrics.f1).toBe(1);
        expect(metrics.falsePositiveRate).toBe(0);
    });

    test("detects false positives", () => {
        const results = [
            {
                actualAutomated: false,
                predictedAutomated: true
            }
        ];

        const metrics = calculateMetrics(results);

        expect(metrics.falsePositive).toBe(1);
        expect(metrics.falsePositiveRate).toBe(1);
    });

    test("detects false negatives", () => {
        const results = [
            {
                actualAutomated: true,
                predictedAutomated: false
            }
        ];

        const metrics = calculateMetrics(results);

        expect(metrics.falseNegative).toBe(1);
        expect(metrics.recall).toBe(0);
    });
});