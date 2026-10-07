const puppeteer = require("puppeteer");

async function launchPuppeteer(headless = true) {
    return puppeteer.launch({
        headless,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    });
}

module.exports = {
    launchPuppeteer
};