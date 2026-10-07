function analyzeSignals(signals) {
    const indicators = [];
    let score = 0;

    if (signals.webdriver === true) {
        indicators.push("navigator.webdriver");
        score += 10;
    }

    if (/HeadlessChrome/i.test(signals.userAgent || "")) {
        indicators.push("HeadlessChrome user agent");
        score += 30;
    }

    if (signals.plugins === 0) {
        indicators.push("no browser plugins");
        score += 10;
    }

    if (
        signals.outerWidth === signals.innerWidth &&
        signals.outerHeight === signals.innerHeight
    ) {
        indicators.push("outer/inner window dimensions match");
        score += 15;
    }

    if (
        signals.screenWidth === signals.innerWidth &&
        signals.screenHeight === signals.innerHeight
    ) {
        indicators.push("screen dimensions match viewport");
        score += 15;
    }

    if (signals.notificationPermission === "denied") {
        indicators.push("notification permission denied");
        score += 10;
    }

    // Firefox headless currently reports no browser chrome around the
    // viewport width, while Firefox headful reports additional window chrome.
    if (
        /Firefox/i.test(signals.userAgent || "") &&
        signals.outerWidth === signals.innerWidth
    ) {
        indicators.push("Firefox outer width matches viewport");
        score += 20;
    }

    return {
        automated: score >= 30,
        score,
        indicators
    };
}

async function detectBrowser(page) {
    const start = performance.now();

    const signals = await page.evaluate(() => {
        const canvas = document.createElement("canvas");
        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");
    
        let webglVendor = null;
        let webglRenderer = null;
    
        if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    
            if (debugInfo) {
                webglVendor = gl.getParameter(
                    debugInfo.UNMASKED_VENDOR_WEBGL
                );
    
                webglRenderer = gl.getParameter(
                    debugInfo.UNMASKED_RENDERER_WEBGL
                );
            }
        }
    
        return {
            webdriver: navigator.webdriver,
            userAgent: navigator.userAgent,
            languages: navigator.languages,
            plugins: navigator.plugins.length,
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory ?? null,
            chromeObject: typeof window.chrome !== "undefined",
    
            vendor: navigator.vendor,
            appVersion: navigator.appVersion,
            product: navigator.product,
            maxTouchPoints: navigator.maxTouchPoints,
    
            // Browser/window characteristics
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            screenWidth: screen.width,
            screenHeight: screen.height,
            devicePixelRatio: window.devicePixelRatio,
    
            visibilityState: document.visibilityState,
    
            // Permissions API
            permissionsApi: typeof navigator.permissions !== "undefined",
    
            // Notification API
            notificationPermission:
                typeof Notification !== "undefined"
                    ? Notification.permission
                    : null,
    
            // WebGL characteristics
            webglVendor,
            webglRenderer
        };
    });

    const result = analyzeSignals(signals);
    const elapsedMs = performance.now() - start;

    return {
        ...result,
        signals,
        elapsedMs
    };
}

async function detectInteractionBehavior(page) {
    const start = performance.now();

    await page.mouse.move(100, 100);
    await page.mouse.move(150, 120);
    await page.mouse.move(200, 150);

    const elapsedMs = performance.now() - start;

    return {
        interactionElapsedMs: elapsedMs
    };
}

module.exports = {
    analyzeSignals,
    detectBrowser,
    detectInteractionBehavior
};