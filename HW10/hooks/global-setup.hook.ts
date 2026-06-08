import type { Config } from '@jest/types';

export default function globalSetup(
    globalConfig: Config.GlobalConfig,
    projectConfig?: Config.ProjectConfig
): void {
    console.log('✅ Global setup completed');
}
