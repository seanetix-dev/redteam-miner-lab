const humanChrome = {
    webdriver: false,
    userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/154.0.0.0 Safari/537.36",
    plugins: 5,
    languages: ["en-US", "en"],
    platform: "Win32",
    hardwareConcurrency: 8,
    deviceMemory: 8,
    chromeObject: true
};

const headlessChrome = {
    webdriver: true,
    userAgent:
        "Mozilla/5.0 HeadlessChrome/154.0.0.0 Safari/537.36",
    plugins: 0,
    languages: ["en-US"],
    platform: "Linux x86_64",
    hardwareConcurrency: 4,
    deviceMemory: 4,
    chromeObject: true
};

module.exports = {
    humanChrome,
    headlessChrome
};