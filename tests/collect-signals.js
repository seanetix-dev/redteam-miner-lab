async function collectSignals(page) {
    return page.evaluate(() => {
        const canvas = document.createElement("canvas");
        const gl =
            canvas.getContext("webgl") ||
            canvas.getContext("experimental-webgl");

        let webglVendor = null;
        let webglRenderer = null;

        if (gl) {
            const debugInfo = gl.getExtension(
                "WEBGL_debug_renderer_info"
            );

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

            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,

            screenWidth: screen.width,
            screenHeight: screen.height,

            devicePixelRatio: window.devicePixelRatio,

            visibilityState: document.visibilityState,

            permissionsApi:
                typeof navigator.permissions !== "undefined",

            notificationPermission:
                typeof Notification !== "undefined"
                    ? Notification.permission
                    : null,

            webglVendor,
            webglRenderer
        };
    });
}

module.exports = {
    collectSignals
};