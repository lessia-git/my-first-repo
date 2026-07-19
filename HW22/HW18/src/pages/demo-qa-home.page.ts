import { Page, Locator } from '@playwright/test';

export class DemoQAHomePage {
    private readonly page: Page;
    private readonly elementsCard: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.elementsCard = page.locator('.card', { hasText: 'Elements' });
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://demoqa.com');
    }

    public async navigateToElements(): Promise<void> {
        await this.elementsCard.click();
        await this.page.waitForURL('**/elements');
    }

    public async navigateToTextBox(): Promise<void> {
        if (await this.elementsCard.isVisible()) {
            await this.elementsCard.click();
        }
        await this.page.locator('li', { hasText: 'Text Box' }).click();
        await this.page.waitForURL('**/text-box');
    }

    public async navigateToButtons(): Promise<void> {
        if (await this.elementsCard.isVisible()) {
            await this.elementsCard.click();
        }
        await this.page.locator('li', { hasText: 'Buttons' }).click();
        await this.page.waitForURL('**/buttons');
    }
}
