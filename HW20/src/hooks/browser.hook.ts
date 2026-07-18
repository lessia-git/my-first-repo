import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { RobotDreamsWorld } from '../worlds/robot-dreams.world';
import { chromium } from '@playwright/test';

export function browserHook(): void {
    BeforeAll(async function (): Promise<void> {
        RobotDreamsWorld.browser = await chromium.launch({ headless: true });
        RobotDreamsWorld.globalContext = new Map<string, unknown>();
    });

    AfterAll(async function (): Promise<void> {
        await RobotDreamsWorld.browser.close();
    });
}
