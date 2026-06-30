import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

export class RozetkaPage {
    public async goTo(): Promise<void> {
        await browser.url('https://rozetka.com.ua');
    }

    public get storesLink(): ChainablePromiseElement {
        return $('//a[contains(@class, "main-links-link") and contains(., "Магазини Rozetka")]');
    }

    public get storesHeader(): ChainablePromiseElement {
        return $('h1');
    }

    public get catalogBtn(): ChainablePromiseElement {
        return $('button[data-testid="fat_menu_btn"]');
    }

    public get laptopCategoryLink(): ChainablePromiseElement {
        return $('//a[@data-testid="fat_menu_category_link" and contains(., "Ноутбуки та комп’ютери")]');
    }

    public get heading(): ChainablePromiseElement {
        return $('h1.portal__heading');
    }
}
