import { test, expect } from '../src/fixtures';

test.describe('Navigation tests', () => {
    test('should navigate to the Elements page and verify subcategory URL', async ({ homePage }) => {
        await test.step('Open demoqa homepage', async () => {
            await homePage.goto();
        });

        await test.step('Navigate to Elements category', async () => {
            await homePage.navigateToCard('Elements');
        });

        await test.step('Verify navigation to Check Box category via sidebar', async () => {
            await homePage.sidebar.selectMenuItem('Elements', 'Check Box');
            await expect(homePage.page).toHaveURL(/checkbox/);
        });
    });
});
