export const config: WebdriverIO.Config = {
    runner: 'local',
    automationProtocol: 'devtools',
    tsConfigPath: './tsconfig.json',
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--lang=uk-UA',
                '--window-size=1920,1080',
                '--disable-gpu',
                '--no-sandbox',
                '--disable-dev-shm-usage',
                '--disable-blink-features=AutomationControlled',
                '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            ],
            excludeSwitches: ['enable-automation'],
            prefs: {
                'intl.accept_languages': 'uk-UA,uk'
            }
        }
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
