import { test, expect } from '@playwright/test';

test.describe('Rozetka UI Elements Interaction Tests', (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.context().setExtraHTTPHeaders({
            'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7'
        });
        await page.goto('/');
    });

    test('should navigate to Rozetka store locations page using CSS and XPath selectors', async ({ page }): Promise<void> => {
        const storesLink = page.locator(
            'xpath=//a[contains(@class, "main-links-link") and contains(text(), "Магазини Rozetka")]'
        );
        await storesLink.click();

        await expect(page).toHaveURL(/.*\/retail\/.*/, { timeout: 15000 });

        const storesHeader = page.locator('h1');
        await expect(storesHeader).toBeVisible();
        await expect(storesHeader).toContainText('Магазини ROZETKA');
    });

    test('should open product category menu using CSS and XPath selectors', async ({ page }): Promise<void> => {
        const catalogBtn = page.locator('button[data-testid="fat_menu_btn"]');
        await catalogBtn.click();

        const laptopCategoryLink = page.locator(
            'xpath=//a[@data-testid="fat_menu_category_link" and contains(., "Ноутбуки та комп’ютери")]'
        );
        await laptopCategoryLink.click();

        const heading = page.locator('h1.portal__heading');
        await expect(heading).toBeVisible({ timeout: 15000 });
        await expect(heading).toHaveText('Комп\'ютери та ноутбуки');
    });

    test('should navigate to the About Us page from the footer using CSS and XPath selectors', async ({ page }): Promise<void> => {
        const aboutUsLink = page.locator('a[href*="/pages/about/"]');
        await aboutUsLink.scrollIntoViewIfNeeded();

        const aboutUsLinkXpath = page.locator(
            'xpath=//a[contains(@href, "/pages/about/") and contains(text(), "Про нас")]'
        );
        await aboutUsLinkXpath.click();

        await expect(page).toHaveURL(/.*\/pages\/about\/.*/, { timeout: 15000 });

        const aboutUsHeading = page.locator('h1');
        await expect(aboutUsHeading).toBeVisible();
        await expect(aboutUsHeading).toContainText('Про нас');
    });
});
