const { calculateMetrics } = require("../src/evaluation");

function compareFeatures(results) {
    const features = [
        "webdriver",
        "plugins",
        "chromeObject",
        "deviceMemory",
        "maxTouchPoints",
        "outerWidth",
        "outerHeight",
        "innerWidth",
        "innerHeight",
        "screenWidth",
        "screenHeight",
        "devicePixelRatio",
        "visibilityState",
        "permissionsApi",
        "notificationPermission",
        "webglVendor",
        "webglRenderer"
    ];

    console.log("\nFeature Matrix:\n");

    for (const feature of features) {
        console.log(`\n=== ${feature} ===`);

        for (const result of results) {
            console.log(
                `${result.name}:`,
                result.signals[feature]
            );
        }
    }

    console.log("\nMetrics:");
    console.table(calculateMetrics(results));
}

module.exports = { compareFeatures };