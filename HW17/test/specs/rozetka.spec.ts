import { browser } from '@wdio/globals';
import { expect } from 'expect-webdriverio';
import { RozetkaPage } from '../pageobjects/rozetka.page';

describe('Rozetka UI Elements Interaction Tests (WebDriverIO)', (): void => {
    let rozetkaPage: RozetkaPage;

    before(async (): Promise<void> => {
        await browser.setWindowSize(1920, 1080);
        rozetkaPage = new RozetkaPage();
    });

    beforeEach(async (): Promise<void> => {
        await rozetkaPage.goTo();
    });

    it('should navigate to Rozetka store locations page', async (): Promise<void> => {
        await rozetkaPage.storesLink.waitForClickable();
        await rozetkaPage.storesLink.click();
        await expect(browser).toHaveUrl(/.*\/retail\/.*/);
        await expect(rozetkaPage.storesHeader).toBeDisplayed();
        await expect(rozetkaPage.storesHeader).toHaveText(/Магазини ROZETKA/i);
    });

    it('should open product category menu', async (): Promise<void> => {
        await rozetkaPage.catalogBtn.waitForClickable();
        await rozetkaPage.catalogBtn.click();
        await rozetkaPage.laptopCategoryLink.waitForDisplayed();
        await rozetkaPage.laptopCategoryLink.click();
        await expect(rozetkaPage.heading).toBeDisplayed();
        await expect(rozetkaPage.heading).toHaveText('Комп\'ютери та ноутбуки');
    });
});
