import { test, expect } from '../src/fixtures';

test.describe('TextBox tests', () => {
    test('should fill out and submit the TextBox form successfully', async ({ homePage, textBoxPage }) => {
        await test.step('Open demoqa homepage', async () => {
            await homePage.goto();
        });

        await test.step('Navigate to TextBox page', async () => {
            await homePage.navigateToCard('Elements');
            await homePage.sidebar.selectMenuItem('Elements', 'Text Box');
        });

        await test.step('Fill the form and submit', async () => {
            await textBoxPage.fillForm('John Doe', 'john.doe@example.com', '123 Main St', '456 Second St');
            await textBoxPage.submit();
        });

        await test.step('Verify the submitted outputs', async () => {
            const name = await textBoxPage.getSubmittedName();
            const email = await textBoxPage.getSubmittedEmail();
            const currentAddress = await textBoxPage.getSubmittedCurrentAddress();
            const permanentAddress = await textBoxPage.getSubmittedPermanentAddress();

            expect(name).toContain('John Doe');
            expect(email).toContain('john.doe@example.com');
            expect(currentAddress).toContain('123 Main St');
            expect(permanentAddress).toContain('456 Second St');
        });
    });
});
