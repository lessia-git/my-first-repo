import { Locator, Page } from '@playwright/test';

export class ButtonsPage {
    public constructor(private readonly page: Page) {}

    public get doubleClickButton(): Locator {
        return this.page.locator('#doubleClickBtn');
    }

    public get rightClickButton(): Locator {
        return this.page.locator('#rightClickBtn');
    }

    public get dynamicClickButton(): Locator {
        return this.page.locator('//button[text()="Click Me"]');
    }

    public get doubleClickMessage(): Locator {
        return this.page.locator('#doubleClickMessage');
    }

    public get rightClickMessage(): Locator {
        return this.page.locator('#rightClickMessage');
    }

    public get dynamicClickMessage(): Locator {
        return this.page.locator('#dynamicClickMessage');
    }

    public async doubleClick(): Promise<void> {
        await this.doubleClickButton.dblclick();
    }

    public async rightClick(): Promise<void> {
        await this.rightClickButton.click({ button: 'right' });
    }

    public async dynamicClick(): Promise<void> {
        await this.dynamicClickButton.click();
    }
}
