import { expect } from 'chai';
import { ConfigService } from '../src/services/config.service';
import { FetchApiService } from '../src/services/fetch-api.service';
import { CatApi } from '../src/apis/cat.api';

describe('The Cat API tests (Mocha & Chai)', function (this: Mocha.Suite): void {
    this.timeout(30000);

    const config = new ConfigService().getConfig();
    const catApiService = new FetchApiService(config.api.catApi.baseUrl, config.auth.catApi);
    const catApi = new CatApi(catApiService);
    const subId = `hw14-${Date.now()}`;

    let imageId: string;
    let favouriteId: number | undefined;
    let voteId: number | undefined;

    afterEach(async (): Promise<void> => {
        if (favouriteId !== undefined) {
            await catApi.deleteFavouriteAsync(favouriteId);
            favouriteId = undefined;
        }

        if (voteId !== undefined) {
            await catApi.deleteVoteAsync(voteId);
            voteId = undefined;
        }
    });

    it('should search for cat images and return a non-empty array', async (): Promise<void> => {
        const [response, images] = await catApi.searchImagesAsync(1);

        expect(response.status).to.equal(200);
        expect(images).to.be.an('array').that.is.not.empty;
        expect(images[0]).to.have.property('id').that.is.a('string');
        expect(images[0]).to.have.property('url').that.is.a('string');

        imageId = images[0].id;
    });

    it('should retrieve a specific image by ID', async (): Promise<void> => {
        // Ensure we have an image ID
        if (!imageId) {
            const [, images] = await catApi.searchImagesAsync(1);
            imageId = images[0].id;
        }

        const [response, image] = await catApi.getImageAsync(imageId);

        expect(response.status).to.equal(200);
        expect(image).to.have.property('id', imageId);
        expect(image).to.have.property('url').that.is.a('string');
    });

    it('should create, retrieve, and delete a favourite cat image', async (): Promise<void> => {
        if (!imageId) {
            const [, images] = await catApi.searchImagesAsync(1);
            imageId = images[0].id;
        }

        // 1. Create favourite
        const [createResponse, createdFavourite] = await catApi.createFavouriteAsync(imageId, subId);
        expect(createResponse.status).to.equal(200);
        expect(createdFavourite.message).to.equal('SUCCESS');
        expect(createdFavourite.id).to.be.a('number');
        favouriteId = createdFavourite.id;

        // 2. List favourites and verify it's there
        const [listResponse, favourites] = await catApi.listFavouritesAsync(subId);
        expect(listResponse.status).to.equal(200);
        const favourite = favourites.find((item) => item.id === favouriteId);
        expect(favourite).to.exist;
        expect(favourite).to.include({
            id: favouriteId,
            image_id: imageId,
            sub_id: subId
        });

        // 3. Delete favourite
        const [deleteResponse, deletedFavourite] = await catApi.deleteFavouriteAsync(favouriteId);
        expect(deleteResponse.status).to.equal(200);
        expect(deletedFavourite.message).to.equal('SUCCESS');
        favouriteId = undefined;
    });

    it('should create, list, and delete a vote for a cat image', async (): Promise<void> => {
        if (!imageId) {
            const [, images] = await catApi.searchImagesAsync(1);
            imageId = images[0].id;
        }

        // 1. Create vote
        const [createResponse, createdVote] = await catApi.createVoteAsync(imageId, subId, 1);
        expect(createResponse.status).to.equal(201);
        expect(createdVote.message).to.equal('SUCCESS');
        expect(createdVote.id).to.be.a('number');
        voteId = createdVote.id;

        // 2. List votes and verify it's there
        const [listResponse, votes] = await catApi.listVotesAsync(subId);
        expect(listResponse.status).to.equal(200);
        const vote = votes.find((item) => item.id === voteId);
        expect(vote).to.exist;
        expect(vote).to.include({
            id: voteId,
            image_id: imageId,
            sub_id: subId,
            value: 1
        });

        // 3. Delete vote
        const [deleteResponse, deletedVote] = await catApi.deleteVoteAsync(voteId);
        expect(deleteResponse.status).to.equal(200);
        expect(deletedVote.message).to.equal('SUCCESS');
        voteId = undefined;
    });

    it('should return a 400 or 404 status when requesting a non-existent image ID', async (): Promise<void> => {
        const invalidId = 'non-existent-image-id-1234';
        const [response] = await catApi.getImageAsync(invalidId);
        expect(response.status).to.be.oneOf([400, 404]);
    });
});
