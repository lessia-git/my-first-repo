const common = {
    requireModule: ['tsx/esm'],
    import: ['src/**/*.ts'],
    format: [
        'pretty'
    ],
    formatOptions: {
        snippetInterface: 'async-await'
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
