import { Page } from '@playwright/test';
import { DemoQABasePage } from './demo-qa-base.page';
import { CardComponent } from './components';

export class DemoQAHomePage extends DemoQABasePage {
    public constructor(page: Page) {
        super(page);
    }

    public getCard(cardName: string): CardComponent {
        return new CardComponent(this.page.locator('.card', { hasText: cardName }));
    }

    public async navigateToCard(cardName: string): Promise<void> {
        const card = this.getCard(cardName);
        await card.click();
    }
}
