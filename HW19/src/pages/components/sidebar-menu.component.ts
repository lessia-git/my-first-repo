import { Locator } from '@playwright/test';

export class SidebarMenuComponent {
    public constructor(private readonly baseLocator: Locator) {}

    public async selectMenuItem(groupName: string, itemName: string): Promise<void> {
        const group = this.baseLocator.locator('.element-group', { hasText: groupName });
        const header = group.locator('.header-wrapper');
        const listContainer = group.locator('.menu-list');

        const isExpanded = await listContainer.isVisible();
        if (!isExpanded) {
            await header.click({ force: true });
        }

        const menuItem = group.locator('li.btn', { hasText: itemName });
        await menuItem.click({ force: true });
    }
}
