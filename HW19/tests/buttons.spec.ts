import { test, expect } from '../src/fixtures';

test.describe('Buttons tests', () => {
    test('should perform double click, right click, and dynamic click successfully', async ({ homePage, buttonsPage }) => {
        await test.step('Open demoqa homepage', async () => {
            await homePage.goto();
        });

        await test.step('Navigate to Buttons page', async () => {
            await homePage.navigateToCard('Elements');
            await homePage.sidebar.selectMenuItem('Elements', 'Buttons');
        });

        await test.step('Perform double click and verify message', async () => {
            await buttonsPage.doubleClick();
            const message = await buttonsPage.getDoubleClickMessage();
            expect(message).toBe('You have done a double click');
        });

        await test.step('Perform right click and verify message', async () => {
            await buttonsPage.rightClick();
            const message = await buttonsPage.getRightClickMessage();
            expect(message).toBe('You have done a right click');
        });

        await test.step('Perform dynamic click and verify message', async () => {
            await buttonsPage.clickDynamic();
            const message = await buttonsPage.getDynamicClickMessage();
            expect(message).toBe('You have done a dynamic click');
        });
    });
});
