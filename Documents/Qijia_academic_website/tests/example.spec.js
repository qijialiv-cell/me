const { test, expect } = require('@playwright/test');

// Simple smoke test that expects the site to contain the Research section
test('homepage loads and shows Research section', async ({ page }) => {
  await page.goto('http://localhost:8000');
  await expect(page.locator('text=Research')).toBeVisible();
});
