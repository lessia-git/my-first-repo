import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { RobotDreamsWorld } from '../worlds/robot-dreams.world';

Given('the user is on the DemoQA home page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.goto();
});

When('the user navigates to the Text Box page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.navigateToTextBox();
});

When('the user fills the Text Box form with:', async function (this: RobotDreamsWorld, data: DataTable): Promise<void> {
    const rows = data.hashes();
    for (const row of rows) {
        const field = row['field'];
        const value = row['value'];
        switch (field) {
            case 'userName':
                await this.textBoxPage.fillUserName(value);
                break;
            case 'email':
                await this.textBoxPage.fillEmail(value);
                break;
            case 'currentAddress':
                await this.textBoxPage.fillCurrentAddress(value);
                break;
            case 'permanentAddress':
                await this.textBoxPage.fillPermanentAddress(value);
                break;
            default:
                throw new Error(`Unknown field: ${field}`);
        }
    }
});

When('the user clicks the submit button', async function (this: RobotDreamsWorld): Promise<void> {
    await this.textBoxPage.clickSubmit();
});

Then('the output should contain the correct user details:', async function (this: RobotDreamsWorld, data: DataTable): Promise<void> {
    const rows = data.hashes();
    for (const row of rows) {
        const field = row['field'];
        const value = row['value'];
        switch (field) {
            case 'userName':
                await expect(this.textBoxPage.outputName).toContainText(value);
                break;
            case 'email':
                await expect(this.textBoxPage.outputEmail).toContainText(value);
                break;
            case 'currentAddress':
                await expect(this.textBoxPage.outputCurrentAddress).toContainText(value);
                break;
            case 'permanentAddress':
                await expect(this.textBoxPage.outputPermanentAddress).toContainText(value);
                break;
            default:
                throw new Error(`Unknown field: ${field}`);
        }
    }
});

When('the user navigates to the Buttons page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.navigateToButtons();
});

When('the user double clicks the double click button', async function (this: RobotDreamsWorld): Promise<void> {
    await this.buttonsPage.doubleClick();
});

Then('the double click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.buttonsPage.doubleClickMessage).toHaveText(expectedMessage);
});

When('the user right clicks the right click button', async function (this: RobotDreamsWorld): Promise<void> {
    await this.buttonsPage.rightClick();
});

Then('the right click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.buttonsPage.rightClickMessage).toHaveText(expectedMessage);
});

When('the user clicks the dynamic click button', async function (this: RobotDreamsWorld): Promise<void> {
    await this.buttonsPage.dynamicClick();
});

Then('the dynamic click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.buttonsPage.dynamicClickMessage).toHaveText(expectedMessage);
});

When('the user navigates to the Elements page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.navigateToElements();
});

Then('the elements header message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.elementsPage.getHeaderMessage(expectedMessage)).toBeVisible();
});
