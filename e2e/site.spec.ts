import { test, expect, Page } from '@playwright/test';

async function navigate(page: Page, section: string) {
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  if (await toggle.isVisible()) await toggle.click();
  await page.locator('.nav-link').filter({ hasText: new RegExp(`^${section}$`) }).click();
  await expect(page).toHaveURL(new RegExp(`#${section.toLowerCase()}$`));
}

test('repeated section navigation preserves one slideshow and sticky navigation', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.waitForFunction(() => !!(document.querySelector('.home-slides') as any)?.swiper);
  await page.evaluate(() => (window as any).initialSwiper = (document.querySelector('.home-slides') as any).swiper);
  for (let i = 0; i < 3; i++) {
    for (const section of ['About', 'Gallery', 'Home']) {
      await navigate(page, section);
      await expect.poll(() => page.locator(`#${section.toLowerCase()}`).evaluate(el => Math.abs(el.getBoundingClientRect().top))).toBeLessThan(160);
    }
  }
  expect(await page.evaluate(() => (window as any).initialSwiper === (document.querySelector('.home-slides') as any).swiper)).toBe(true);
  await expect(page.locator('.swiper-pagination-bullet')).toHaveCount(8);
  await navigate(page, 'Gallery');
  await expect(page.locator('nav')).toHaveClass(/is-sticky/);
  expect(errors).toEqual([]);
});

test('slideshow autoplay advances', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => !!(document.querySelector('.home-slides') as any)?.swiper);
  const initial = await page.locator('.home-slides').evaluate(el => (el as any).swiper.realIndex);
  await expect.poll(() => page.locator('.home-slides').evaluate(el => (el as any).swiper.realIndex), { timeout: 15000 }).not.toBe(initial);
});

test('gallery opens by keyboard, advances, closes, and restores focus', async ({ page }) => {
  await page.goto('/#gallery');
  const first = page.locator('.popup-btn').first();
  await first.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mfp-img')).toBeVisible();
  await expect(page.locator('.mfp-img')).toHaveAttribute('src', /front1-large.webp$/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('.mfp-img')).toHaveAttribute('src', /side-entry-large.webp$/);
  await page.keyboard.press('Escape');
  await expect(page.locator('.mfp-wrap')).toHaveCount(0);
  await expect(first).toBeFocused();
});

test('gallery images load with reserved dimensions and no horizontal overflow', async ({ page }) => {
  await page.goto('/#gallery');
  const images = page.locator('#gallery img');
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    expect(await image.getAttribute('width')).toBeTruthy();
    expect(await image.getAttribute('height')).toBeTruthy();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('gallery.png'), fullPage: true });
});

test('retired routes redirect to Harrison home', async ({ page }) => {
  for (const route of ['/home-2', '/home-3', '/home-4']) {
    await page.goto(route);
    await expect(page).toHaveURL('http://127.0.0.1:4300/');
    await expect(page.locator('.home-slides')).toBeVisible();
    await expect(page.locator('form')).toHaveCount(0);
  }
});

test('map and Analytics remain and obsolete scripts are absent', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('iframe[src*="google.com/maps/embed"]')).toHaveCount(1);
  await expect(page.locator('script[src*="G-0B83PWH64H"]')).toHaveCount(1);
  await expect(page.locator('script[src*="maps.googleapis.com/maps/api/js"]')).toHaveCount(0);
  await expect(page.locator('script[src*="assets/js/main.js"]')).toHaveCount(0);
});

test('back to top is keyboard accessible and map has a useful title', async ({ page }) => {
  await page.goto('/#gallery');
  const top = page.getByRole('button', { name: 'Back to top' });
  await expect(top).toBeVisible();
  await top.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(5);
  await expect(page.locator('iframe')).toHaveAttribute('title', /2723 Harrison Street/);
  expect(await page.locator('iframe').evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(320);
});

test('slideshow can be paused and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Play slideshow' })).toBeVisible();
  expect(await page.locator('.home-slides').evaluate(el => (el as any).swiper.autoplay.running)).toBe(false);
  await page.getByRole('button', { name: 'Play slideshow' }).click();
  expect(await page.locator('.home-slides').evaluate(el => (el as any).swiper.autoplay.running)).toBe(true);
  await page.getByRole('button', { name: 'Pause slideshow' }).click();
  expect(await page.locator('.home-slides').evaluate(el => (el as any).swiper.autoplay.running)).toBe(false);
});
