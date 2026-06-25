import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: 1,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'https://rozetka.com.ua',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: false,
        launchOptions: {
            args: ['--disable-blink-features=AutomationControlled']
        }
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        }
    ]
});
