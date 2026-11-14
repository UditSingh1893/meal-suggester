import { test, expect } from '@playwright/test';
test('pantry to recommendation workflow without login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByText('Your kitchen at a glance')).toBeVisible();
  await page.goto('/pantry');
  for (const ingredient of ['rice','tomato','onion','oil']) {
    await page.getByPlaceholder('Ingredient').fill(ingredient);
    await page.getByRole('button',{name:'Add'}).click();
    await expect(page.getByText(ingredient,{exact:true})).toBeVisible();
  }
  await page.goto('/recommendations');
  await expect(page.getByText(/Almost Ready|Can Make Now/).first()).toBeVisible();
  await page.getByRole('button',{name:'Favorite'}).first().click();
  const addMissing=page.getByRole('button',{name:'Add missing'}).first();
  if(await addMissing.isVisible()) await addMissing.click();
  await page.goto('/favorites');
  await expect(page.locator('.card').filter({hasText:/Tomato Rice|Rice/}).first()).toBeVisible();
  await page.goto('/shopping-lists');
});
