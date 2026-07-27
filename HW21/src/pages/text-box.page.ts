import { Locator, Page } from '@playwright/test';

export class TextBoxPage {
    public constructor(private readonly page: Page) {}

    public get userNameInput(): Locator {
        return this.page.locator('#userName');
    }

    public get emailInput(): Locator {
        return this.page.locator('#userEmail');
    }

    public get currentAddressInput(): Locator {
        return this.page.locator('#currentAddress');
    }

    public get permanentAddressInput(): Locator {
        return this.page.locator('#permanentAddress');
    }

    public get submitButton(): Locator {
        return this.page.locator('#submit');
    }

    public get outputName(): Locator {
        return this.page.locator('#output #name');
    }

    public get outputEmail(): Locator {
        return this.page.locator('#output #email');
    }

    public get outputCurrentAddress(): Locator {
        return this.page.locator('#output #currentAddress');
    }

    public get outputPermanentAddress(): Locator {
        return this.page.locator('#output #permanentAddress');
    }

    public async fillUserName(name: string): Promise<void> {
        await this.userNameInput.fill(name);
    }

    public async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    public async fillCurrentAddress(address: string): Promise<void> {
        await this.currentAddressInput.fill(address);
    }

    public async fillPermanentAddress(address: string): Promise<void> {
        await this.permanentAddressInput.fill(address);
    }

    public async clickSubmit(): Promise<void> {
        await this.submitButton.click();
    }
}
