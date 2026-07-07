import { Locator, Page } from 'puppeteer';

export class RozetkaPage {
    public constructor(private page: Page) {}

    public async goTo(): Promise<void> {
        await this.page.setExtraHTTPHeaders({
            'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7'
        });
        await this.page.goto('https://rozetka.com.ua', { waitUntil: 'domcontentloaded' });
    }

    public get storesLink(): Locator<Element> {
        return this.page.locator('xpath///a[contains(@class, "main-links-link") and contains(., "Магазини Rozetka")]');
    }

    public get storesHeader(): Locator<Element> {
        return this.page.locator('h1');
    }

    public get catalogBtn(): Locator<Element> {
        return this.page.locator('button[data-testid="fat_menu_btn"]');
    }

    public get laptopCategoryLink(): Locator<Element> {
        return this.page.locator('xpath///a[@data-testid="fat_menu_category_link" and contains(., "Ноутбуки та комп’ютери")]');
    }

    public get heading(): Locator<Element> {
        return this.page.locator('h1.portal__heading');
    }
}
