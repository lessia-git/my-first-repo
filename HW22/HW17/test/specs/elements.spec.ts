import { $, expect } from '@wdio/globals';
import { DemoQAHomePage } from '../../src/pages/demo-qa-home.page';

describe('Elements Page Tests', () => {
    it('Navigate to Elements page and verify header', async () => {
        const home = new DemoQAHomePage();
        await home.goto();
        await home.navigateToElements();
        const practiceText = $('//div[contains(text(), "Please select an item from left to start practice.")]');
        await expect(practiceText).toBeDisplayed();
    });
});
