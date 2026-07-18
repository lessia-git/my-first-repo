import { Locator, Page } from '@playwright/test';

export class ElementsPage {
    public constructor(private readonly page: Page) {}

    public getHeaderMessage(message: string): Locator {
        return this.page.getByText(message);
    }
}
