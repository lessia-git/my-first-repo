import { Page, Locator } from '@playwright/test';
import { DemoQABasePage } from './demo-qa-base.page';

export class ButtonsPage extends DemoQABasePage {
    private get doubleClickBtn(): Locator {
        return this.page.locator('#doubleClickBtn');
    }

    private get rightClickBtn(): Locator {
        return this.page.locator('#rightClickBtn');
    }

    private get dynamicClickBtn(): Locator {
        return this.page.locator('button').filter({ hasText: /^Click Me$/ });
    }

    private get doubleClickMessage(): Locator {
        return this.page.locator('#doubleClickMessage');
    }

    private get rightClickMessage(): Locator {
        return this.page.locator('#rightClickMessage');
    }

    private get dynamicClickMessage(): Locator {
        return this.page.locator('#dynamicClickMessage');
    }

    public constructor(page: Page) {
        super(page);
    }

    public async doubleClick(): Promise<void> {
        await this.doubleClickBtn.dblclick();
    }

    public async rightClick(): Promise<void> {
        await this.rightClickBtn.click({ button: 'right' });
    }

    public async clickDynamic(): Promise<void> {
        await this.dynamicClickBtn.click();
    }

    public async getDoubleClickMessage(): Promise<string> {
        return (await this.doubleClickMessage.textContent()) ?? '';
    }

    public async getRightClickMessage(): Promise<string> {
        return (await this.rightClickMessage.textContent()) ?? '';
    }

    public async getDynamicClickMessage(): Promise<string> {
        return (await this.dynamicClickMessage.textContent()) ?? '';
    }
}
