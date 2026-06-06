import { test, expect } from "@playwright/test";

// Must match the filenames actually rendered on the page (see public/).
const IMAGES = [
  "man.png", // Hero cover
  "woman.jpg", // Agitation
  "sadd.jpg", // Agitation
  "mainbook.png", // Solution
  "objj.jpg", // Objections
  "salesin.jpg", // SocialProof
  "3book.jpg", // ValueStack bonuses
  "bundle.png", // ValueStack full stack
];

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Sales page QA", () => {
  // 1. Visibility: all 6 images load and are visible.
  test("all six images load and are visible", async ({ page }) => {
    for (const file of IMAGES) {
      // next/image rewrites src to /_next/image?url=...&... so match by encoded filename.
      const encoded = encodeURIComponent(`/${file}`);
      const img = page.locator(`img[src*="${encoded}"]`).first();

      // next/image lazy-loads below-the-fold images; scroll each into view so
      // it actually fetches before we assert.
      await img.scrollIntoViewIfNeeded();
      await expect(img, `image ${file} should be visible`).toBeVisible();

      // Confirm the bitmap actually decoded (naturalWidth > 0), not just the <img> box.
      await expect
        .poll(async () => img.evaluate((el: HTMLImageElement) => el.naturalWidth), {
          timeout: 10_000,
        })
        .toBeGreaterThan(0);
    }
  });

  // 2. CTAs: every Get/Yes/Boost button is clickable and points to the checkout link.
  test("every CTA is visible and links to the checkout", async ({ page }) => {
    const ctas = page.getByTestId("cta");
    const count = await ctas.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const cta = ctas.nth(i);
      await expect(cta).toBeVisible();

      const text = ((await cta.textContent()) ?? "").trim();
      expect(text, `CTA #${i} text should signal action`).toMatch(/Get|Yes|Boost/i);

      // Live checkout link (PAYMENT_URL).
      await expect(cta).toHaveAttribute("href", "https://selar.com/799g812727");
    }
  });

  // 4. Theme: the primary CTA background is the correct money-green (#16A34A).
  test("primary CTA background is #16A34A (rgb(22, 163, 74))", async ({ page }) => {
    const primary = page.locator('[data-testid="cta"][data-variant="primary"]').first();
    await expect(primary).toBeVisible();

    const bg = await primary.evaluate(
      (el) => getComputedStyle(el).backgroundColor,
    );
    expect(bg).toBe("rgb(22, 163, 74)");
  });
});

// 3. Responsiveness: the headline shrinks on a 390x844 mobile viewport.
test("headline font-size adjusts down on mobile (390x844)", async ({ page }) => {
  const h1 = page.locator("h1").first();

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const desktopSize = await h1.evaluate(
    (el) => parseFloat(getComputedStyle(el).fontSize),
  );

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileSize = await h1.evaluate(
    (el) => parseFloat(getComputedStyle(el).fontSize),
  );

  expect(desktopSize).toBeGreaterThan(0);
  expect(mobileSize).toBeLessThan(desktopSize);
});
