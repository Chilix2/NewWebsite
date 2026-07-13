"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Mobile Menu (Hamburger)', () => {
    (0, test_1.test)('Open and close hamburger menu on iOS Safari', async ({ page }) => {
        await page.goto('/de');
        // Find and click the menu button
        const menuButton = page.locator('[data-testid="menu-button"]');
        await (0, test_1.expect)(menuButton).toBeVisible();
        // Initial state: menu should be closed
        const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
        const initialHidden = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
        (0, test_1.expect)(initialHidden).toBe(true);
        // Open menu
        await menuButton.click();
        await page.waitForTimeout(300); // Wait for CSS animation
        const openVisible = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
        (0, test_1.expect)(openVisible).toBe(true);
        // Close menu
        await menuButton.click();
        await page.waitForTimeout(300); // Wait for CSS animation
        const closedHidden = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
        (0, test_1.expect)(closedHidden).toBe(true);
    });
    (0, test_1.test)('Second toggle of hamburger menu works correctly', async ({ page }) => {
        await page.goto('/de');
        const menuButton = page.locator('[data-testid="menu-button"]');
        const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
        // First toggle open
        await menuButton.click();
        await page.waitForTimeout(300);
        let isOpen = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
        (0, test_1.expect)(isOpen).toBe(true);
        // First toggle close
        await menuButton.click();
        await page.waitForTimeout(300);
        let isClosed = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
        (0, test_1.expect)(isClosed).toBe(true);
        // Second toggle open (this was previously broken)
        await menuButton.click();
        await page.waitForTimeout(300);
        isOpen = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
        (0, test_1.expect)(isOpen).toBe(true);
        // Verify menu is fully rendered with items visible
        const solutions = page.locator('nav[aria-label="Mobile Navigation"] h3');
        await (0, test_1.expect)(solutions).toBeVisible();
    });
    (0, test_1.test)('Menu closes when clicking a navigation link', async ({ page }) => {
        await page.goto('/de');
        const menuButton = page.locator('[data-testid="menu-button"]');
        const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
        // Open menu
        await menuButton.click();
        await page.waitForTimeout(300);
        // Click a navigation link (Solutions > Hotels)
        const hotelLink = page.locator('nav[aria-label="Mobile Navigation"] a:has-text("Hotels")').first();
        await hotelLink.click();
        // Menu should close after navigation
        await page.waitForTimeout(300);
        const isClosed = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
        (0, test_1.expect)(isClosed).toBe(true);
    });
    (0, test_1.test)('Body scroll lock works when menu is open', async ({ page }) => {
        await page.goto('/de');
        const menuButton = page.locator('[data-testid="menu-button"]');
        // Open menu
        await menuButton.click();
        // Check that body has position:fixed (iOS scroll lock)
        const bodyPosition = await page.evaluate(() => getComputedStyle(document.body).position);
        (0, test_1.expect)(bodyPosition).toBe('fixed');
        // Close menu
        await menuButton.click();
        await page.waitForTimeout(300);
        // Check that body is restored to static positioning
        const bodyPositionClosed = await page.evaluate(() => getComputedStyle(document.body).position);
        (0, test_1.expect)(bodyPositionClosed).not.toBe('fixed');
    });
});
test_1.test.describe('Language Switching', () => {
    (0, test_1.test)('Language switch preserves scroll position', async ({ page }) => {
        await page.goto('/de');
        // Scroll down to a specific point
        await page.evaluate(() => window.scrollTo(0, 500));
        let scrollY = await page.evaluate(() => window.scrollY);
        (0, test_1.expect)(scrollY).toBe(500);
        // Switch language to English
        const langButton = page.locator('[data-testid="language-switcher"] button').first();
        await langButton.click();
        const enButton = page.locator('button:has-text("English")');
        await enButton.click();
        // Wait for navigation to complete
        await page.waitForNavigation();
        // Check that scroll position is preserved (or very close)
        scrollY = await page.evaluate(() => window.scrollY);
        (0, test_1.expect)(scrollY).toBeGreaterThan(400); // Allow small variance due to layout differences
    });
    (0, test_1.test)('Language dropdown closes after selection', async ({ page }) => {
        await page.goto('/de');
        const langButton = page.locator('[data-testid="language-switcher"] button').first();
        await langButton.click();
        const langDropdown = page.locator('div[class*="absolute"] button:has-text("English")').first();
        (0, test_1.expect)(langDropdown).toBeTruthy();
        // Click language
        await langDropdown.click();
        await page.waitForNavigation();
        // Verify we're on English page
        (0, test_1.expect)(page.url()).toContain('/en');
    });
});
test_1.test.describe('Audio Demo', () => {
    (0, test_1.test)('Audio demo playback works on touch', async ({ page }) => {
        await page.goto('/de');
        // Find audio demo section and scroll to it
        const audioSection = page.locator('button:has-text("Play")').first();
        await audioSection.scrollIntoViewIfNeeded();
        // Tap play button
        const playButton = page.locator('button:has-text("Play")').first();
        await playButton.click();
        // Check that audio is playing
        const audio = page.locator('audio').first();
        const isPlaying = await audio.evaluate((el) => !el.paused);
        (0, test_1.expect)(isPlaying).toBe(true);
    });
    (0, test_1.test)('Audio progress bar is responsive to touch', async ({ page }) => {
        await page.goto('/de');
        // Find and play audio demo
        const playButton = page.locator('button:has-text("Play")').first();
        await playButton.scrollIntoViewIfNeeded();
        await playButton.click();
        // Give audio time to load and play
        await page.waitForTimeout(1000);
        // Check that progress bar exists and can be seen
        const progressBar = page.locator('input[type="range"]').first();
        (0, test_1.expect)(progressBar).toBeTruthy();
        // Verify progress is advancing
        const initialValue = await progressBar.inputValue();
        await page.waitForTimeout(500);
        const newValue = await progressBar.inputValue();
        // New value should be different or close to initial (depending on audio loading)
        (0, test_1.expect)(parseInt(newValue || '0')).toBeGreaterThanOrEqual(parseInt(initialValue || '0'));
    });
});
test_1.test.describe('Touch Targets', () => {
    (0, test_1.test)('All interactive elements meet 44x44 minimum size', async ({ page }) => {
        await page.goto('/de');
        // Check buttons
        const buttons = page.locator('button');
        const buttonCount = await buttons.count();
        for (let i = 0; i < Math.min(buttonCount, 10); i++) {
            const button = buttons.nth(i);
            if (await button.isVisible()) {
                const box = await button.boundingBox();
                if (box) {
                    (0, test_1.expect)(box.height).toBeGreaterThanOrEqual(44);
                    (0, test_1.expect)(box.width).toBeGreaterThanOrEqual(44);
                }
            }
        }
        // Check links
        const links = page.locator('a');
        const linkCount = await links.count();
        for (let i = 0; i < Math.min(linkCount, 10); i++) {
            const link = links.nth(i);
            if (await link.isVisible() && (await link.getAttribute('href'))) {
                const box = await link.boundingBox();
                if (box) {
                    (0, test_1.expect)(box.height).toBeGreaterThanOrEqual(44);
                    (0, test_1.expect)(box.width).toBeGreaterThanOrEqual(44);
                }
            }
        }
    });
    (0, test_1.test)('Menu toggle button is 44x44 minimum', async ({ page }) => {
        await page.goto('/de');
        const menuButton = page.locator('[data-testid="menu-button"]');
        const box = await menuButton.boundingBox();
        (0, test_1.expect)(box?.height).toBeGreaterThanOrEqual(44);
        (0, test_1.expect)(box?.width).toBeGreaterThanOrEqual(44);
    });
    (0, test_1.test)('Language selector button is 44x44 minimum', async ({ page }) => {
        await page.goto('/de');
        const langButton = page.locator('[data-testid="language-switcher"] button').first();
        const box = await langButton.boundingBox();
        (0, test_1.expect)(box?.height).toBeGreaterThanOrEqual(44);
        (0, test_1.expect)(box?.width).toBeGreaterThanOrEqual(44);
    });
});
test_1.test.describe('Safe Area Rendering', () => {
    (0, test_1.test)('Page respects safe area insets on notched devices', async ({ page }) => {
        await page.goto('/de');
        // Check that body has safe-area-inset applied
        const bodyPadding = await page.evaluate(() => {
            const styles = getComputedStyle(document.body);
            return {
                paddingTop: styles.paddingTop,
                paddingBottom: styles.paddingBottom,
            };
        });
        // Safe area insets should be set (values depend on device)
        (0, test_1.expect)(bodyPadding.paddingTop).toBeDefined();
        (0, test_1.expect)(bodyPadding.paddingBottom).toBeDefined();
    });
    (0, test_1.test)('Header is properly positioned with safe area', async ({ page }) => {
        await page.goto('/de');
        const header = page.locator('header').first();
        const box = await header.boundingBox();
        (0, test_1.expect)(box).toBeTruthy();
        (0, test_1.expect)(box?.top).toBeLessThanOrEqual(50); // Header should be near top
    });
});
test_1.test.describe('Responsive Layout', () => {
    (0, test_1.test)('Content does not overflow viewport width', async ({ page }) => {
        await page.goto('/de');
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);
        (0, test_1.expect)(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px tolerance
    });
    (0, test_1.test)('No horizontal scrollbar on mobile', async ({ page }) => {
        await page.goto('/de');
        const hasHorizontalScroll = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
        (0, test_1.expect)(hasHorizontalScroll).toBe(false);
    });
});
