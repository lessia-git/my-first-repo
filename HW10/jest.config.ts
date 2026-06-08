/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    extensionsToTreatAsEsm: ['.ts'],
    verbose: true,
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
    },
    testPathIgnorePatterns: ['./dist', '/tests/mocha/'],
    clearMocks: true,
    coverageProvider: 'v8',
    globalSetup: './hooks/global-setup.hook.ts',
    globalTeardown: './hooks/global-teardown.hook.ts',
    testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)']
};

export default config;
