import { expect, test } from "@playwright/test";

test("public routes render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /learn with sources/i })).toBeVisible();

  await page.goto("/courses/fme");
  await expect(page.getByRole("heading", { name: /frontier model evaluations/i })).toBeVisible();
});

test("protected routes redirect logged-out visitors", async ({ page }) => {
  await page.goto("/team");
  await expect(page).toHaveURL(/\/login$/);
});
