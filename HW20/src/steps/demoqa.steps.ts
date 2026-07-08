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
        if (field === 'userName') {
            await this.page.fill('#userName', value);
        } else if (field === 'email') {
            await this.page.fill('#userEmail', value);
        } else if (field === 'currentAddress') {
            await this.page.fill('#currentAddress', value);
        } else if (field === 'permanentAddress') {
            await this.page.fill('#permanentAddress', value);
        }
    }
});

When('the user clicks the submit button', async function (this: RobotDreamsWorld): Promise<void> {
    await this.page.click('#submit');
});

Then('the output should contain the correct user details:', async function (this: RobotDreamsWorld, data: DataTable): Promise<void> {
    const rows = data.hashes();
    for (const row of rows) {
        const field = row['field'];
        const value = row['value'];
        if (field === 'userName') {
            await expect(this.page.locator('#output #name')).toContainText(value);
        } else if (field === 'email') {
            await expect(this.page.locator('#output #email')).toContainText(value);
        } else if (field === 'currentAddress') {
            await expect(this.page.locator('#output #currentAddress')).toContainText(value);
        } else if (field === 'permanentAddress') {
            await expect(this.page.locator('#output #permanentAddress')).toContainText(value);
        }
    }
});

When('the user navigates to the Buttons page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.navigateToButtons();
});

When('the user double clicks the double click button', async function (this: RobotDreamsWorld): Promise<void> {
    const doubleBtn = this.page.locator('#doubleClickBtn');
    await doubleBtn.dblclick();
});

Then('the double click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.page.locator('#doubleClickMessage')).toHaveText(expectedMessage);
});

When('the user right clicks the right click button', async function (this: RobotDreamsWorld): Promise<void> {
    const rightBtn = this.page.locator('#rightClickBtn');
    await rightBtn.click({ button: 'right' });
});

Then('the right click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.page.locator('#rightClickMessage')).toHaveText(expectedMessage);
});

When('the user clicks the dynamic click button', async function (this: RobotDreamsWorld): Promise<void> {
    const dynamicBtn = this.page.locator('//button[text()="Click Me"]');
    await dynamicBtn.click();
});

Then('the dynamic click message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.page.locator('#dynamicClickMessage')).toHaveText(expectedMessage);
});

When('the user navigates to the Elements page', async function (this: RobotDreamsWorld): Promise<void> {
    await this.homePage.navigateToElements();
});

Then('the elements header message {string} should be visible', async function (this: RobotDreamsWorld, expectedMessage: string): Promise<void> {
    await expect(this.page.getByText(expectedMessage)).toBeVisible();
});
