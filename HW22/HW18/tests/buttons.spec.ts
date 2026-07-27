import { test, expect } from '@playwright/test';
import { DemoQAHomePage } from '../src/pages/demo-qa-home.page';

test('Buttons interactions', async ({ page }) => {
    const home = new DemoQAHomePage(page);
    await home.goto();
    await home.navigateToButtons();

    const doubleBtn = page.locator('#doubleClickBtn');
    await doubleBtn.dblclick();
    await expect(page.locator('#doubleClickMessage')).toHaveText('You have done a double click');

    const rightBtn = page.locator('#rightClickBtn');
    await rightBtn.click({ button: 'right' });
    await expect(page.locator('#rightClickMessage')).toHaveText('You have done a right click');

    const dynamicBtn = page.locator('//button[text()="Click Me"]');
    await dynamicBtn.click();
    await expect(page.locator('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
});

