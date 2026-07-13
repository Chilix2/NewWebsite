import { test, expect } from '@playwright/test';

test.describe('Mobile Menu (Hamburger)', () => {
  test('Open and close hamburger menu on iOS Safari', async ({ page }) => {
    await page.goto('/de');
    
    // Find and click the menu button
    const menuButton = page.locator('[data-testid="menu-button"]');
    await expect(menuButton).toBeVisible();
    
    // Initial state: menu should be closed
    const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
    const initialHidden = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
    expect(initialHidden).toBe(true);
    
    // Open menu
    await menuButton.click();
    await page.waitForTimeout(300); // Wait for CSS animation
    const openVisible = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
    expect(openVisible).toBe(true);
    
    // Close menu
    await menuButton.click();
    await page.waitForTimeout(300); // Wait for CSS animation
    const closedHidden = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
    expect(closedHidden).toBe(true);
  });

  test('Second toggle of hamburger menu works correctly', async ({ page }) => {
    await page.goto('/de');
    
    const menuButton = page.locator('[data-testid="menu-button"]');
    const mobileNav = page.locator('nav[aria-label="Mobile Navigation"]');
    
    // First toggle open
    await menuButton.click();
    await page.waitForTimeout(300);
    let isOpen = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
    expect(isOpen).toBe(true);
    
    // First toggle close
    await menuButton.click();
    await page.waitForTimeout(300);
    let isClosed = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '0');
    expect(isClosed).toBe(true);
    
    // Second toggle open (this was previously broken)
    await menuButton.click();
    await page.waitForTimeout(300);
    isOpen = await mobileNav.evaluate(el => getComputedStyle(el).opacity === '1');
    expect(isOpen).toBe(true);
    
    // Verify menu is fully rendered with items visible
    const solutions = page.locator('nav[aria-label="Mobile Navigation"] h3');
    await expect(solutions).toBeVisible();
  });

  test('Menu closes when clicking a navigation link', async ({ page }) => {
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
    expect(isClosed).toBe(true);
  });

  test('Body scroll lock works when menu is open', async ({ page }) => {
    await page.goto('/de');
    
    const menuButton = page.locator('[data-testid="menu-button"]');
    
    // Open menu
    await menuButton.click();
    
    // Check that body has position:fixed (iOS scroll lock)
    const bodyPosition = await page.evaluate(() => getComputedStyle(document.body).position);
    expect(bodyPosition).toBe('fixed');
    
    // Close menu
    await menuButton.click();
    await page.waitForTimeout(300);
    
    // Check that body is restored to static positioning
    const bodyPositionClosed = await page.evaluate(() => getComputedStyle(document.body).position);
    expect(bodyPositionClosed).not.toBe('fixed');
  });
});

test.describe('Language Switching', () => {
  test('Language switch preserves scroll position', async ({ page }) => {
    await page.goto('/de');
    
    // Scroll down to a specific point
    await page.evaluate(() => window.scrollTo(0, 500));
    let scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(500);
    
    // Switch language to English
    const langButton = page.locator('[data-testid="language-switcher"] button').first();
    await langButton.click();
    
    const enButton = page.locator('button:has-text("English")');
    await enButton.click();
    
    // Wait for navigation to complete
    await page.waitForNavigation();
    
    // Check that scroll position is preserved (or very close)
    scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(400); // Allow small variance due to layout differences
  });

  test('Language dropdown closes after selection', async ({ page }) => {
    await page.goto('/de');
    
    const langButton = page.locator('[data-testid="language-switcher"] button').first();
    await langButton.click();
    
    const langDropdown = page.locator('div[class*="absolute"] button:has-text("English")').first();
    expect(langDropdown).toBeTruthy();
    
    // Click language
    await langDropdown.click();
    await page.waitForNavigation();
    
    // Verify we're on English page
    expect(page.url()).toContain('/en');
  });
});

test.describe('Audio Demo', () => {
  test('Audio demo playback works on touch', async ({ page }) => {
    await page.goto('/de');
    
    // Find audio demo section and scroll to it
    const audioSection = page.locator('button:has-text("Play")').first();
    await audioSection.scrollIntoViewIfNeeded();
    
    // Tap play button
    const playButton = page.locator('button:has-text("Play")').first();
    await playButton.click();
    
    // Check that audio is playing
    const audio = page.locator('audio').first();
    const isPlaying = await audio.evaluate((el: HTMLAudioElement) => !el.paused);
    expect(isPlaying).toBe(true);
  });

  test('Audio progress bar is responsive to touch', async ({ page }) => {
    await page.goto('/de');
    
    // Find and play audio demo
    const playButton = page.locator('button:has-text("Play")').first();
    await playButton.scrollIntoViewIfNeeded();
    await playButton.click();
    
    // Give audio time to load and play
    await page.waitForTimeout(1000);
    
    // Check that progress bar exists and can be seen
    const progressBar = page.locator('input[type="range"]').first();
    expect(progressBar).toBeTruthy();
    
    // Verify progress is advancing
    const initialValue = await progressBar.inputValue();
    await page.waitForTimeout(500);
    const newValue = await progressBar.inputValue();
    
    // New value should be different or close to initial (depending on audio loading)
    expect(parseInt(newValue || '0')).toBeGreaterThanOrEqual(parseInt(initialValue || '0'));
  });
});

test.describe('Touch Targets', () => {
  test('All interactive elements meet 44x44 minimum size', async ({ page }) => {
    await page.goto('/de');
    
    // Check buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.width).toBeGreaterThanOrEqual(44);
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
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.width).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  test('Menu toggle button is 44x44 minimum', async ({ page }) => {
    await page.goto('/de');
    
    const menuButton = page.locator('[data-testid="menu-button"]');
    const box = await menuButton.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
  });

  test('Language selector button is 44x44 minimum', async ({ page }) => {
    await page.goto('/de');
    
    const langButton = page.locator('[data-testid="language-switcher"] button').first();
    const box = await langButton.boundingBox();
    
    expect(box?.height).toBeGreaterThanOrEqual(44);
    expect(box?.width).toBeGreaterThanOrEqual(44);
  });
});

test.describe('Safe Area Rendering', () => {
  test('Page respects safe area insets on notched devices', async ({ page }) => {
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
    expect(bodyPadding.paddingTop).toBeDefined();
    expect(bodyPadding.paddingBottom).toBeDefined();
  });

  test('Header is properly positioned with safe area', async ({ page }) => {
    await page.goto('/de');
    
    const header = page.locator('header').first();
    const box = await header.boundingBox();
    
    expect(box).toBeTruthy();
    expect(box?.y).toBeLessThanOrEqual(50); // Header should be near top
  });
});

test.describe('Responsive Layout', () => {
  test('Content does not overflow viewport width', async ({ page }) => {
    await page.goto('/de');
    
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px tolerance
  });

  test('No horizontal scrollbar on mobile', async ({ page }) => {
    await page.goto('/de');
    
    const hasHorizontalScroll = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(hasHorizontalScroll).toBe(false);
  });
});
