const { chromium, firefox } = require("playwright");

async function launchChromium(headless = true) {
    return chromium.launch({ headless });
}

async function launchFirefox(headless = true) {
    return firefox.launch({ headless });
}

module.exports = {
    launchChromium,
    launchFirefox
};