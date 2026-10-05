const SIGNAL_WEIGHTS = {
    "navigator.webdriver": 50,
    "HeadlessChrome user agent": 30,
    "no browser plugins": 10
};

function calculateScore(indicators) {
    return indicators.reduce((score, indicator) => {
        return score + (SIGNAL_WEIGHTS[indicator] || 0);
    }, 0);
}

function classifyScore(score) {
    if (score >= 70) {
        return "high-risk";
    }

    if (score >= 30) {
        return "suspicious";
    }

    return "low-risk";
}

module.exports = {
    calculateScore,
    classifyScore
};