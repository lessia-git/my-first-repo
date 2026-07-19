import { $, expect } from '@wdio/globals';
import { DemoQAHomePage } from '../../src/pages/demo-qa-home.page';

describe('Buttons Interaction Tests', () => {
    it('Buttons interactions', async () => {
        const home = new DemoQAHomePage();
        await home.goto();
        await home.navigateToButtons();

        const doubleBtn = $('#doubleClickBtn');
        await doubleBtn.doubleClick();
        await expect($('#doubleClickMessage')).toHaveText('You have done a double click');

        const rightBtn = $('#rightClickBtn');
        await rightBtn.click({ button: 'right' });
        await expect($('#rightClickMessage')).toHaveText('You have done a right click');

        const dynamicBtn = $('//button[text()="Click Me"]');
        await dynamicBtn.click();
        await expect($('#dynamicClickMessage')).toHaveText('You have done a dynamic click');
    });
});
