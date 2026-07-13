import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';

const LOCALES = ['de', 'en'];
const DEVICES  = ['desktop', 'mobile'];

test.describe('Percy visual regression', () => {

  for (const locale of LOCALES) {
    test(`Homepage /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      await page.addStyleTag({ content: `*, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }` });

      await percySnapshot(page, `Homepage ${locale.toUpperCase()}`, {
        widths: [375, 414, 768, 1280, 1920],
      });
    });

    test(`Header /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('domcontentloaded');
      await percySnapshot(page, `Header ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
    });

    test(`Workflow section /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => {
        const elem = document.querySelector('[data-testid="workflow"]');
        if (elem) elem.scrollIntoView();
      });
      await page.waitForTimeout(500);
      await percySnapshot(page, `Workflow ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
    });

    test(`Dashboard section /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => {
        const elem = document.querySelector('[data-testid="dashboard"]');
        if (elem) elem.scrollIntoView();
      });
      await page.waitForTimeout(500);
      await percySnapshot(page, `Dashboard ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
    });

    test(`Audio Demo /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => {
        const elem = document.querySelector('[data-testid="audio-demo"]');
        if (elem) elem.scrollIntoView();
      });
      await page.waitForTimeout(500);
      await percySnapshot(page, `Audio Demo ${locale.toUpperCase()}`, { widths: [375, 768, 1280] });
    });
  }
});
