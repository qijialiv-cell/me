const { test, expect } = require('@playwright/test');

test.describe('Blog Page Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
  });

  test('Navigate to Blog page', async ({ page }) => {
    // Click Blog link in navigation
    await page.click('a[href="#blog"]');
    await expect(page.locator('#blog')).toBeVisible();

    // Check section number within blog section
    await expect(page.locator('#blog .section-number')).toContainText('06 / 07');
  });

  test('Blog page displays search bar and filters', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Check search input
    await expect(page.locator('#blogSearch')).toBeVisible();

    // Check filter container
    await expect(page.locator('#filterContainer')).toBeVisible();
  });

  test('Blog renders 3 articles', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Wait for blog posts to load
    await page.waitForSelector('.blog-card, .blog-card-link', { timeout: 5000 });

    // Check number of blog cards (including link cards)
    const cards = await page.locator('.blog-card').count();
    expect(cards).toBe(3);
  });

  test('Search functionality works', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Search for "PhD"
    await page.fill('#blogSearch', 'PhD');
    await page.waitForTimeout(500); // Wait for debounce

    // Should show PhD related articles
    const cards = await page.locator('.blog-card').count();
    expect(cards).toBeGreaterThanOrEqual(1);
  });

  test('Category filter works - AI & ML', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Click AI & ML filter
    await page.click('.filter-btn[data-category="ai"]');
    await page.waitForTimeout(500);

    // Should show AI category articles (2 articles)
    const cards = await page.locator('.blog-card').count();
    expect(cards).toBe(2);

    // Check category badge
    await expect(page.locator('.blog-card-category').first()).toContainText('AI & ML');
  });

  test('Category filter works - Workflow', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Click Workflow filter
    await page.click('.filter-btn[data-category="workflow"]');
    await page.waitForTimeout(500);

    // Should show 1 Workflow article
    const cards = await page.locator('.blog-card').count();
    expect(cards).toBe(1);
  });

  test('Blog cards link to external pages', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card-link');

    // Check that blog card links exist
    const linkCards = await page.locator('.blog-card-link').count();
    expect(linkCards).toBeGreaterThan(0);

    // Check that links point to correct files
    const firstLink = page.locator('.blog-card-link').first();
    const href = await firstLink.getAttribute('href');
    expect(href).toContain('assets/documents/');
    expect(href).toContain('.html');
  });

  test('Chinese articles display badge', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Find Chinese articles (should have language badge)
    const languageBadges = await page.locator('.blog-card-language').count();
    expect(languageBadges).toBeGreaterThan(0);

    // Check that Chinese articles have correct badge
    const badgeText = await page.locator('.blog-card-language').first().textContent();
    expect(badgeText).toBe('中文');
  });

  test('Featured articles have featured styling', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Check featured cards exist
    const featuredCards = await page.locator('.blog-card.featured').count();
    expect(featuredCards).toBe(3);

    // Check they have featured class
    await expect(page.locator('.blog-card.featured').first()).toBeVisible();
  });

  test('Tags are displayed correctly', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Check first card has tags
    const firstCardTags = await page.locator('.blog-card').first().locator('.blog-card-tag').count();
    expect(firstCardTags).toBeGreaterThan(0);
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Press right arrow to go to Contact page
    await page.keyboard.press('ArrowRight');

    // Should navigate to Contact page
    await expect(page.locator('#contact')).toBeVisible();
    await expect(page.locator('#contact .section-number')).toContainText('07 / 07');

    // Press left arrow to go back to Blog page
    await page.keyboard.press('ArrowLeft');

    // Should navigate back to Blog page
    await expect(page.locator('#blog')).toBeVisible();
    await expect(page.locator('#blog .section-number')).toContainText('06 / 07');
  });

  test('Navigation arrows work', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Click next arrow
    await page.click('.page-nav-next');

    // Should navigate to Contact page
    await expect(page.locator('#contact')).toBeVisible();

    // Click prev arrow
    await page.click('.page-nav-prev');

    // Should navigate back to Blog page
    await expect(page.locator('#blog')).toBeVisible();
  });

  test('Responsive design - mobile view', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Blog content should still be visible
    await expect(page.locator('.blog-section')).toBeVisible();
    await expect(page.locator('#blogSearch')).toBeVisible();
    await expect(page.locator('.blog-list')).toBeVisible();
  });

  test('No console errors on Blog page', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('http://localhost:8080/#blog');
    await page.waitForSelector('.blog-card');

    // Check no errors
    expect(errors.length).toBe(0);
  });

  test('Blog data loads correctly', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Wait for blog cards to load
    await page.waitForSelector('.blog-card', { timeout: 5000 });

    // Check first card has expected content
    const firstCardTitle = await page.locator('.blog-card-title').first().textContent();
    expect(firstCardTitle).toBeTruthy();
    expect(firstCardTitle.length).toBeGreaterThan(0);

    const firstCardExcerpt = await page.locator('.blog-card-excerpt').first().textContent();
    expect(firstCardExcerpt).toBeTruthy();
    expect(firstCardExcerpt.length).toBeGreaterThan(0);
  });

  test('Blog section has correct page number', async ({ page }) => {
    await page.goto('http://localhost:8080/#blog');

    // Check Blog section number is 06 / 07
    const sectionNumber = await page.locator('#blog .section-number').textContent();
    expect(sectionNumber).toBe('06 / 07');

    // Check Contact section number is 07 / 07
    await page.click('.page-nav-next');
    const contactSectionNumber = await page.locator('#contact .section-number').textContent();
    expect(contactSectionNumber).toBe('07 / 07');
  });
});