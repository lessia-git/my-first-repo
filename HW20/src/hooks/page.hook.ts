import { After, Before } from '@cucumber/cucumber';
import { RobotDreamsWorld } from '../worlds/robot-dreams.world';
import { BrowserContextOptions } from '@playwright/test';

export function pageHook(): void {
    Before(async function (this: RobotDreamsWorld): Promise<void> {
        const options: BrowserContextOptions = {
            viewport: { width: 1600, height: 900 }
        };

        this.browserContext = await RobotDreamsWorld.browser.newContext(options);
        this.page = await this.browserContext.newPage();

        // Block ad domains to speed up and stabilize demoqa.com
        await this.page.route('**/*', (route) => {
            const url = route.request().url();
            if (
                url.includes('googleads') ||
                url.includes('doubleclick') ||
                url.includes('adnxs') ||
                url.includes('amazon-adsystem') ||
                url.includes('pagead') ||
                url.includes('adservice') ||
                url.includes('analytics')
            ) {
                void route.abort();
            } else {
                void route.continue();
            }
        });
    });

    After(async function (this: RobotDreamsWorld): Promise<void> {
        await this.browserContext.close();
    });
}
