import { test as base } from '@playwright/test';
import { DemoQAHomePage, TextBoxPage, ButtonsPage } from '../pages';

export interface PagesFixture {
    homePage: DemoQAHomePage;
    textBoxPage: TextBoxPage;
    buttonsPage: ButtonsPage;
}

export const test = base.extend<PagesFixture>({
    homePage: async ({ page }, use) => {
        const homePage = new DemoQAHomePage(page);
        await use(homePage);
    },
    textBoxPage: async ({ page }, use) => {
        const textBoxPage = new TextBoxPage(page);
        await use(textBoxPage);
    },
    buttonsPage: async ({ page }, use) => {
        const buttonsPage = new ButtonsPage(page);
        await use(buttonsPage);
    }
});

export { expect } from '@playwright/test';
