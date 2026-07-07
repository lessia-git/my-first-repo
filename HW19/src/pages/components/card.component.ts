import { Locator } from '@playwright/test';

export class CardComponent {
    private get title(): Locator {
        return this.baseLocator.locator('.card-body h5');
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async click(): Promise<void> {
        await this.baseLocator.click();
    }

    public async getTitle(): Promise<string> {
        return (await this.title.textContent()) ?? '';
    }
}
