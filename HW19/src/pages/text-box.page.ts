import { Page, Locator } from '@playwright/test';
import { DemoQABasePage } from './demo-qa-base.page';

export class TextBoxPage extends DemoQABasePage {
    private get userNameInput(): Locator {
        return this.page.locator('#userName');
    }

    private get userEmailInput(): Locator {
        return this.page.locator('#userEmail');
    }

    private get currentAddressInput(): Locator {
        return this.page.locator('#currentAddress');
    }

    private get permanentAddressInput(): Locator {
        return this.page.locator('#permanentAddress');
    }

    private get submitButton(): Locator {
        return this.page.locator('#submit');
    }

    private get outputName(): Locator {
        return this.page.locator('#output #name');
    }

    private get outputEmail(): Locator {
        return this.page.locator('#output #email');
    }

    private get outputCurrentAddress(): Locator {
        return this.page.locator('#output #currentAddress');
    }

    private get outputPermanentAddress(): Locator {
        return this.page.locator('#output #permanentAddress');
    }

    public constructor(page: Page) {
        super(page);
    }

    public async fillForm(name: string, email: string, currentAddress: string, permanentAddress: string): Promise<void> {
        await this.userNameInput.fill(name);
        await this.userEmailInput.fill(email);
        await this.currentAddressInput.fill(currentAddress);
        await this.permanentAddressInput.fill(permanentAddress);
    }

    public async submit(): Promise<void> {
        await this.submitButton.click({ force: true });
    }

    public async getSubmittedName(): Promise<string> {
        return (await this.outputName.textContent()) ?? '';
    }

    public async getSubmittedEmail(): Promise<string> {
        return (await this.outputEmail.textContent()) ?? '';
    }

    public async getSubmittedCurrentAddress(): Promise<string> {
        return (await this.outputCurrentAddress.textContent()) ?? '';
    }

    public async getSubmittedPermanentAddress(): Promise<string> {
        return (await this.outputPermanentAddress.textContent()) ?? '';
    }
}
