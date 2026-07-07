import { defineConfig } from 'cypress';

export default defineConfig({
    allowCypressEnv: false,

    e2e: {
        setupNodeEvents(): void {
            // implement node event listeners here
        }
    }
});
