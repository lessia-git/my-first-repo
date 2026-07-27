import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';

export class DemoQAHomePage {
    public get elementsCard(): ChainablePromiseElement {
        return $('//h5[text()="Elements"]/ancestor::div[contains(@class, "card")]');
    }

    public async goto(): Promise<void> {
        await browser.url('https://demoqa.com');
    }

    public async navigateToElements(): Promise<void> {
        await browser.url('https://demoqa.com/elements');
    }

    public async navigateToTextBox(): Promise<void> {
        await browser.url('https://demoqa.com/text-box');
    }

    public async navigateToButtons(): Promise<void> {
        await browser.url('https://demoqa.com/buttons');
    }
}
