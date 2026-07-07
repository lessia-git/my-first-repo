import { Page } from '@playwright/test';
import { SidebarMenuComponent } from './components';

export class DemoQABasePage {
    public readonly sidebar: SidebarMenuComponent;

    public constructor(public readonly page: Page) {
        this.sidebar = new SidebarMenuComponent(page.locator('.left-pannel'));
    }

    public async goto(path = ''): Promise<void> {
        await this.page.goto(`https://demoqa.com${path}`);
    }
}
