import { CatImageDto, CatApiCreatedResourceDto, FavouriteDto, VoteDto } from '../models';
import { IApiService } from '../services/i-api.service';

export class CatApi {
    public constructor(private readonly apiService: IApiService<Response>) {}

    public async searchImagesAsync(limit = 1): Promise<[Response, CatImageDto[]]> {
        const response = await this.apiService.getAsync('/images/search', { limit });
        const responseBody = await this.parseBodyAsync<CatImageDto[]>(response);
        return [response, responseBody];
    }

    public async getImageAsync(imageId: string): Promise<[Response, CatImageDto]> {
        const response = await this.apiService.getAsync(`/images/${encodeURIComponent(imageId)}`);
        const responseBody = await this.parseBodyAsync<CatImageDto>(response);
        return [response, responseBody];
    }

    public async createFavouriteAsync(imageId: string, subId: string): Promise<[Response, CatApiCreatedResourceDto]> {
        const response = await this.apiService.postAsync('/favourites', {
            image_id: imageId,
            sub_id: subId
        });
        const responseBody = await this.parseBodyAsync<CatApiCreatedResourceDto>(response);
        return [response, responseBody];
    }

    public async listFavouritesAsync(subId: string): Promise<[Response, FavouriteDto[]]> {
        const response = await this.apiService.getAsync('/favourites', { sub_id: subId });
        const responseBody = await this.parseBodyAsync<FavouriteDto[]>(response);
        return [response, responseBody];
    }

    public async deleteFavouriteAsync(favouriteId: number): Promise<[Response, CatApiCreatedResourceDto]> {
        const response = await this.apiService.deleteAsync(`/favourites/${favouriteId}`);
        const responseBody = await this.parseBodyAsync<CatApiCreatedResourceDto>(response);
        return [response, responseBody];
    }

    public async createVoteAsync(imageId: string, subId: string, value: number): Promise<[Response, CatApiCreatedResourceDto]> {
        const response = await this.apiService.postAsync('/votes', {
            image_id: imageId,
            sub_id: subId,
            value
        });
        const responseBody = await this.parseBodyAsync<CatApiCreatedResourceDto>(response);
        return [response, responseBody];
    }

    public async listVotesAsync(subId: string): Promise<[Response, VoteDto[]]> {
        const response = await this.apiService.getAsync('/votes', { sub_id: subId });
        const responseBody = await this.parseBodyAsync<VoteDto[]>(response);
        return [response, responseBody];
    }

    public async deleteVoteAsync(voteId: number): Promise<[Response, CatApiCreatedResourceDto]> {
        const response = await this.apiService.deleteAsync(`/votes/${voteId}`);
        const responseBody = await this.parseBodyAsync<CatApiCreatedResourceDto>(response);
        return [response, responseBody];
    }

    private async parseBodyAsync<T>(response: Response): Promise<T> {
        const text = await response.text();
        try {
            return text ? JSON.parse(text) as T : {} as T;
        } catch {
            return text as unknown as T;
        }
    }
}
