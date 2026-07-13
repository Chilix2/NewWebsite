"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
exports.default = (0, test_1.defineConfig)({
    testDir: './tests',
    workers: 1,
    use: {
        baseURL: 'https://www.sailly.de',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...test_1.devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...test_1.devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...test_1.devices['Desktop Safari'] },
        },
        {
            name: 'Mobile Chrome',
            use: { ...test_1.devices['Pixel 7'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...test_1.devices['iPhone 12'] },
        },
    ],
});
