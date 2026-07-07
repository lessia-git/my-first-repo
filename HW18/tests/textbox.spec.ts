import { test, expect } from '@playwright/test';
import { DemoQAHomePage } from '../src/pages/demo-qa-home.page';

test('Fill Text Box form and verify output', async ({ page }) => {
    const home = new DemoQAHomePage(page);
    await home.goto();
    await home.navigateToTextBox();

    await page.fill('#userName', 'John Doe');
    await page.fill('#userEmail', 'john.doe@example.com');
    await page.fill('#currentAddress', '123 Main St');
    await page.fill('#permanentAddress', '456 Second St');
    await page.click('#submit');

    await expect(page.locator('#output #name')).toContainText('John Doe');
    await expect(page.locator('#output #email')).toContainText('john.doe@example.com');
    await expect(page.locator('#output #currentAddress')).toContainText('123 Main St');
    await expect(page.locator('#output #permanentAddress')).toContainText('456 Second St');
});
