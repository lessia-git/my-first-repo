export interface CatImageDto {
    id: string;
    url: string;
    width?: number;
    height?: number;
}

export interface CatApiCreatedResourceDto {
    id: number;
    message: string;
}

export interface FavouriteDto {
    id: number;
    image_id: string;
    sub_id?: string;
    image?: CatImageDto;
}

export interface VoteDto {
    id: number;
    image_id: string;
    sub_id?: string;
    value: number;
}
