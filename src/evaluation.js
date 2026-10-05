function calculateMetrics(results) {
    let truePositive = 0;
    let trueNegative = 0;
    let falsePositive = 0;
    let falseNegative = 0;

    for (const result of results) {
        const actual = result.actualAutomated;
        const predicted = result.predictedAutomated;

        if (actual && predicted) {
            truePositive++;
        } else if (!actual && !predicted) {
            trueNegative++;
        } else if (!actual && predicted) {
            falsePositive++;
        } else if (actual && !predicted) {
            falseNegative++;
        }
    }

    const precision =
        truePositive + falsePositive === 0
            ? 0
            : truePositive /
              (truePositive + falsePositive);

    const recall =
        truePositive + falseNegative === 0
            ? 0
            : truePositive /
              (truePositive + falseNegative);

    const f1 =
        precision + recall === 0
            ? 0
            : 2 * (precision * recall) /
              (precision + recall);

    const total = results.length;

    const accuracy =
        total === 0
            ? 0
            : (truePositive + trueNegative) / total;

    const falsePositiveRate =
        trueNegative + falsePositive === 0
            ? 0
            : falsePositive /
              (falsePositive + trueNegative);

    return {
        truePositive,
        trueNegative,
        falsePositive,
        falseNegative,
        precision,
        recall,
        f1,
        accuracy,
        falsePositiveRate
    };
}

module.exports = {
    calculateMetrics
};