import type { Config } from '@jest/types';

export default function globalTeardown(
    globalConfig: Config.GlobalConfig,
    projectConfig?: Config.ProjectConfig
): void {
    console.log('✅ Global teardown completed');
}
