import { test, expect, Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test.describe('Index Page', () => {
  test('should see body', async ({ page }: { page: Page }) => {
    await expect(page.locator('body')).toBeVisible()
  })
})
