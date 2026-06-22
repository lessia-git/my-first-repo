import { ApiConfigDto, AuthConfigDto, ConfigDto } from '../models';
import { config } from 'dotenv-safe';
import * as fs from 'fs';

export class ConfigService {
    public constructor() {
        config();
    }

    public getConfig(): ConfigDto {
        const apiConfig = this.getFileConfig();
        const authConfig = this.getAuthConfig();
        return {
            api: apiConfig,
            auth: authConfig
        };
    }

    public getFileConfig(): ApiConfigDto {
        const configDto = fs.readFileSync('config.json', 'utf-8');
        return JSON.parse(configDto) as ApiConfigDto;
    }

    public getAuthConfig(): AuthConfigDto {
        return {
            catApi: {
                apiKey: process.env.CAT_API_KEY || 'DEMO-API-KEY'
            }
        };
    }
}
