import { $, expect } from '@wdio/globals';
import { DemoQAHomePage } from '../../src/pages/demo-qa-home.page';

describe('Text Box Form Tests', () => {
    it('Fill Text Box form and verify output', async () => {
        const home = new DemoQAHomePage();
        await home.goto();
        await home.navigateToTextBox();

        await $('#userName').setValue('John Doe');
        await $('#userEmail').setValue('john.doe@example.com');
        await $('#currentAddress').setValue('123 Main St');
        await $('#permanentAddress').setValue('456 Second St');
        
        const submitBtn = $('#submit');
        await submitBtn.scrollIntoView();
        await submitBtn.click();

        await expect($('#output #name')).toHaveText(expect.stringContaining('John Doe'));
        await expect($('#output #email')).toHaveText(expect.stringContaining('john.doe@example.com'));
        await expect($('#output #currentAddress')).toHaveText(expect.stringContaining('123 Main St'));
        await expect($('#output #permanentAddress')).toHaveText(expect.stringContaining('456 Second St'));
    });
});
