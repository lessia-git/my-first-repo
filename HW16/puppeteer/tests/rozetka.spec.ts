import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer';
import { afterAll, afterEach, beforeAll, beforeEach, describe, test, expect } from 'vitest';
import { RozetkaPage } from '../src/pages/rozetka.page';

describe('Rozetka UI Elements Interaction Tests (Puppeteer)', (): void => {
    let page: Page;
    let browser: Browser;
    let context: BrowserContext;
    let rozetkaPage: RozetkaPage;

    beforeAll(async (): Promise<void> => {
        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: { width: 1920, height: 1080 },
            args: ['--disable-blink-features=AutomationControlled']
        });
    });

    afterEach(async (): Promise<void> => {
        if (context) {
            await context.close();
        }
    });

    afterAll(async (): Promise<void> => {
        if (browser) {
            await browser.close();
        }
    });

    beforeEach(async (): Promise<void> => {
        context = await browser.createBrowserContext();
        page = await context.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36');
        page.setDefaultTimeout(30000);
        rozetkaPage = new RozetkaPage(page);
        await rozetkaPage.goTo();
    });

    test('should navigate to Rozetka store locations page', async (): Promise<void> => {
        await rozetkaPage.storesLink.click();

        const headerHandle = await rozetkaPage.storesHeader.waitHandle();
        const isVisible = await headerHandle.isVisible();
        expect(isVisible).toBe(true);

        const url = page.url();
        expect(url).toMatch(/.*\/retail\/.*/);

        const headerText = await page.evaluate((el: Element) => el.textContent, headerHandle);
        expect(headerText).toContain('Магазини ROZETKA');
    });

    test('should open product category menu', async (): Promise<void> => {
        await rozetkaPage.catalogBtn.click();
        await page.waitForSelector('xpath///a[@data-testid="fat_menu_category_link" and contains(., "Ноутбуки та комп’ютери")]', { visible: true });
        await rozetkaPage.laptopCategoryLink.click();

        const headingHandle = await rozetkaPage.heading.waitHandle();
        const isVisible = await headingHandle.isVisible();
        expect(isVisible).toBe(true);

        const headingText = await page.evaluate((el: Element) => el.textContent, headingHandle);
        expect(headingText).toContain('Комп\'ютери та ноутбуки');
    });
});
