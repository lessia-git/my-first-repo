export interface IApiService<T> {
    baseUrl: string;
    getAsync(uri: string, params?: Record<string, string | number | boolean>, headers?: HeadersInit): Promise<T>;
    postAsync(uri: string, body: unknown, headers?: HeadersInit): Promise<T>;
    postFormAsync(uri: string, formData: FormData, headers?: HeadersInit): Promise<T>;
    putAsync(uri: string, body: unknown, headers?: HeadersInit): Promise<T>;
    deleteAsync(uri: string, headers?: HeadersInit): Promise<T>;
}
