import { IWorldOptions, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { DemoQAHomePage } from '../pages/demo-qa-home.page';
import { TextBoxPage } from '../pages/text-box.page';
import { ButtonsPage } from '../pages/buttons.page';
import { ElementsPage } from '../pages/elements.page';

export class RobotDreamsWorld extends World {
    public static globalContext: Map<string, unknown>;
    public static browser: Browser;
    public browserContext!: BrowserContext;
    public page!: Page;
    public scenarioContext = new Map<string, unknown>();

    private _homePage!: DemoQAHomePage;
    private _textBoxPage!: TextBoxPage;
    private _buttonsPage!: ButtonsPage;
    private _elementsPage!: ElementsPage;

    public constructor(options: IWorldOptions) {
        super(options);
    }

    public get homePage(): DemoQAHomePage {
        if (!this._homePage) {
            this._homePage = new DemoQAHomePage(this.page);
        }
        return this._homePage;
    }

    public get textBoxPage(): TextBoxPage {
        if (!this._textBoxPage) {
            this._textBoxPage = new TextBoxPage(this.page);
        }
        return this._textBoxPage;
    }

    public get buttonsPage(): ButtonsPage {
        if (!this._buttonsPage) {
            this._buttonsPage = new ButtonsPage(this.page);
        }
        return this._buttonsPage;
    }

    public get elementsPage(): ElementsPage {
        if (!this._elementsPage) {
            this._elementsPage = new ElementsPage(this.page);
        }
        return this._elementsPage;
    }
}
