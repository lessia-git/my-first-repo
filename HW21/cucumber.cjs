const common = {
    requireModule: ['tsx/esm'],
    import: ['src/**/*.ts'],
    format: [
        'pretty',
        'allure-cucumberjs/reporter'
    ],
    formatOptions: {
        snippetInterface: 'async-await',
        resultsDir: 'allure-results'
    },
    tags: 'not @skip'
};

const ci = {
    ...common,
    format: [
        ...common.format,
        'json:./reports/cucumber.json',
        'html:./reports/cucumber-embedded.html',
        'junit:./reports/cucumber.xml'
    ],
    formatOptions: {
        ...common.formatOptions
    },
    retry: 2
};

const local = {
    ...ci,
    retry: 0
};

module.exports = {
    default: common,
    ci: ci,
    local: local
};
