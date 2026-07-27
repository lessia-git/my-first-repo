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
        await this.page.waitForURL('**/elements', { waitUntil: 'domcontentloaded' });
    }

    public async navigateToTextBox(): Promise<void> {
        if (await this.elementsCard.isVisible()) {
            await this.elementsCard.click();
            await this.page.waitForURL('**/elements', { waitUntil: 'domcontentloaded' });
        }
        await this.page.locator('li', { hasText: 'Text Box' }).locator('span.text').click();
        await this.page.waitForURL('**/text-box', { waitUntil: 'domcontentloaded' });
    }

    public async navigateToButtons(): Promise<void> {
        if (await this.elementsCard.isVisible()) {
            await this.elementsCard.click();
            await this.page.waitForURL('**/elements', { waitUntil: 'domcontentloaded' });
        }
        await this.page.locator('li', { hasText: 'Buttons' }).locator('span.text').click();
        await this.page.waitForURL('**/buttons', { waitUntil: 'domcontentloaded' });
    }
}
