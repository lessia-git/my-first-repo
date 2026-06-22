import { IApiService } from './i-api.service';

export class FetchApiService implements IApiService<Response> {
    public constructor(
        public readonly baseUrl: string,
        private readonly secrets: {
            apiKey?: string;
            basicToken?: string;
            bearerToken?: string;
        }
    ) {}

    public async getAsync(uri: string, params?: Record<string, string | number | boolean>, headers?: HeadersInit): Promise<Response> {
        const queries = params ? `?${Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&')}` : '';
        const url = `${this.baseUrl}${uri}${queries}`;
        const requestHeaders = new Headers(this.getDefaultHeaders());
        if (headers) {
            const extraHeaders = new Headers(headers);
            extraHeaders.forEach((value, key) => {
                requestHeaders.set(key, value);
            });
        }

        return await fetch(url, {
            method: 'GET',
            headers: requestHeaders
        });
    }

    public async postAsync(uri: string, body: unknown, headers?: HeadersInit): Promise<Response> {
        const url = `${this.baseUrl}${uri}`;
        const requestHeaders = new Headers(this.getDefaultHeaders());
        requestHeaders.set('Content-Type', 'application/json');
        if (headers) {
            const extraHeaders = new Headers(headers);
            extraHeaders.forEach((value, key) => {
                requestHeaders.set(key, value);
            });
        }

        return await fetch(url, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(body)
        });
    }

    public async postFormAsync(uri: string, formData: FormData, headers?: HeadersInit): Promise<Response> {
        const url = `${this.baseUrl}${uri}`;
        const requestHeaders = new Headers(this.getDefaultHeaders());
        if (headers) {
            const extraHeaders = new Headers(headers);
            extraHeaders.forEach((value, key) => {
                requestHeaders.set(key, value);
            });
        }

        return await fetch(url, {
            method: 'POST',
            headers: requestHeaders,
            body: formData
        });
    }

    public async putAsync(uri: string, body: unknown, headers?: HeadersInit): Promise<Response> {
        const url = `${this.baseUrl}${uri}`;
        const requestHeaders = new Headers(this.getDefaultHeaders());
        requestHeaders.set('Content-Type', 'application/json');
        if (headers) {
            const extraHeaders = new Headers(headers);
            extraHeaders.forEach((value, key) => {
                requestHeaders.set(key, value);
            });
        }

        return await fetch(url, {
            method: 'PUT',
            headers: requestHeaders,
            body: JSON.stringify(body)
        });
    }

    public async deleteAsync(uri: string, headers?: HeadersInit): Promise<Response> {
        const url = `${this.baseUrl}${uri}`;
        const requestHeaders = new Headers(this.getDefaultHeaders());
        if (headers) {
            const extraHeaders = new Headers(headers);
            extraHeaders.forEach((value, key) => {
                requestHeaders.set(key, value);
            });
        }

        return await fetch(url, {
            method: 'DELETE',
            headers: requestHeaders
        });
    }

    private getDefaultHeaders(): Record<string, string> {
        const headers: Record<string, string> = {};

        if (this.secrets.apiKey) {
            headers['x-api-key'] = this.secrets.apiKey;
        }
        if (this.secrets.basicToken) {
            headers['Authorization'] = `Basic ${this.secrets.basicToken}`;
        }
        if (this.secrets.bearerToken) {
            headers['Authorization'] = `Bearer ${this.secrets.bearerToken}`;
        }
        return headers;
    }
}
