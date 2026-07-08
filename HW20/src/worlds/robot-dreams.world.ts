import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { DemoQAHomePage } from '../pages/demo-qa-home.page';

export class RobotDreamsWorld extends World {
    public static globalContext: Map<string, unknown>;
    public static browser: Browser;
    public browserContext!: BrowserContext;
    public page!: Page;
    public scenarioContext = new Map<string, unknown>();

    private _homePage!: DemoQAHomePage;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public get homePage(): DemoQAHomePage {
        if (!this._homePage) {
            this._homePage = new DemoQAHomePage(this.page);
        }
        return this._homePage;
    }
}
