import { test, expect } from '@playwright/test';
import { DemoQAHomePage } from '../src/pages/demo-qa-home.page';

test('Navigate to Elements page and verify header', async ({ page }) => {
    const home = new DemoQAHomePage(page);
    await home.goto();
    await home.navigateToElements();
    await expect(page.getByText('Please select an item from left to start practice.')).toBeVisible();
});
