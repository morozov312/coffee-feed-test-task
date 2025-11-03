import { expect, test } from '@playwright/test'

const TEST_TIMEOUT = 10_000
const INACTIVITY_TIMEOUT_MS = 30000

test.describe('Coffee Feed', () => {
  test('adds a new card when "Add Coffee" button is clicked', async ({ page }) => {
    // Check button disable/enable states and new card addition
    await page.goto('/')
    const btn = page.getByTestId('add-button')
    await expect(btn).toBeEnabled()

    await btn.click()
    await expect(btn).toBeDisabled()

    const cards = page.getByTestId('card')
    await expect(cards).toHaveCount(2, { timeout: TEST_TIMEOUT })
    await expect(btn).toBeEnabled()
  })

  test('shows a placeholder before the image loads', async ({ page }) => {
    // Validate that placeholder appears before the actual image is loaded
    await page.goto('/')
    const imageWrapper = page.getByTestId('image-wrapper').first()

    await expect(imageWrapper).toBeVisible()
    await expect(imageWrapper.locator('img')).toBeVisible({ timeout: TEST_TIMEOUT })
  })

  test('automatically adds a card after inactivity timeout', async ({ page }) => {
    await page.goto('/')
    const cards = page.getByTestId('card')
    await expect(cards).toHaveCount(1)

    await page.waitForTimeout(INACTIVITY_TIMEOUT_MS + 100)
    await expect(cards).toHaveCount(2)
  })
})
