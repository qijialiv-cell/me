const { test, expect } = require('@playwright/test');

// Simple smoke test that expects the site to contain the Research section
test('homepage loads and shows Research section', async ({ page }) => {
  await page.goto('http://localhost:8080');
  // Use a more specific selector to find the Research section title
  await expect(page.locator('#research .section-title')).toBeVisible();
});
