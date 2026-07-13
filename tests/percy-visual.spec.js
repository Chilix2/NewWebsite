"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const playwright_1 = __importDefault(require("@percy/playwright"));
const LOCALES = ['de', 'en'];
const DEVICES = ['desktop', 'mobile'];
test_1.test.describe('Percy visual regression', () => {
    for (const locale of LOCALES) {
        (0, test_1.test)(`Homepage /${locale}`, async ({ page }) => {
            await page.goto(`/${locale}`);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(2000);
            await page.addStyleTag({ content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }` });
            await (0, playwright_1.default)(page, `Homepage ${locale.toUpperCase()}`, {
                widths: [375, 414, 768, 1280, 1920],
            });
        });
        (0, test_1.test)(`Header /${locale}`, async ({ page }) => {
            await page.goto(`/${locale}`);
            await page.waitForLoadState('domcontentloaded');
            await (0, playwright_1.default)(page, `Header ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
        });
        (0, test_1.test)(`Workflow section /${locale}`, async ({ page }) => {
            await page.goto(`/${locale}`);
            await page.waitForLoadState('networkidle');
            await page.evaluate(() => {
                const elem = document.querySelector('[data-testid="workflow"]');
                if (elem)
                    elem.scrollIntoView();
            });
            await page.waitForTimeout(500);
            await (0, playwright_1.default)(page, `Workflow ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
        });
        (0, test_1.test)(`Dashboard section /${locale}`, async ({ page }) => {
            await page.goto(`/${locale}`);
            await page.waitForLoadState('networkidle');
            await page.evaluate(() => {
                const elem = document.querySelector('[data-testid="dashboard"]');
                if (elem)
                    elem.scrollIntoView();
            });
            await page.waitForTimeout(500);
            await (0, playwright_1.default)(page, `Dashboard ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
        });
        (0, test_1.test)(`Audio Demo /${locale}`, async ({ page }) => {
            await page.goto(`/${locale}`);
            await page.waitForLoadState('networkidle');
            await page.evaluate(() => {
                const elem = document.querySelector('[data-testid="audio-demo"]');
                if (elem)
                    elem.scrollIntoView();
            });
            await page.waitForTimeout(500);
            await (0, playwright_1.default)(page, `Audio Demo ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
        });
    }
});
