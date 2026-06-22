export interface ConfigDto {
    auth: AuthConfigDto;
    api: ApiConfigDto;
}

export interface AuthConfigDto {
    catApi: CatApiAuthConfigDto;
}

export interface CatApiAuthConfigDto {
    apiKey: string;
}

export interface ApiConfigDto {
    catApi: ApiConfig;
}

interface ApiConfig {
    baseUrl: string;
}
