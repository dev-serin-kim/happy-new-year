import { expect, test } from "@playwright/test";

test("첫 화면에 빨간 양 우표와 엽서 더미가 보인다", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("붉은 양의 연하장");
  await expect(page.getByRole("img", { name: "here's to new beginnings" })).toBeVisible();
  await expect(page.getByRole("link", { name: /엽서 쓰기/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /모두의 엽서/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /비밀 우체통/ })).toBeVisible();
});
