import { expect } from 'chai';

const CAT_API_BASE_URL = 'https://api.thecatapi.com/v1';
const CAT_API_KEY = process.env.THE_CAT_API_KEY ?? process.env.CAT_API_KEY ?? 'DEMO-API-KEY';

interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
}

interface CatApiCreatedResource {
  id: number;
  message: string;
}

interface Favourite {
  id: number;
  image_id: string;
  sub_id?: string;
  image?: CatImage;
}

interface Vote {
  id: number;
  image_id: string;
  sub_id?: string;
  value: number;
}

class CatApiClient {
  private readonly baseUrl: string;

  private readonly apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async searchImages(limit = 1): Promise<CatImage[]> {
    return this.request<CatImage[]>(`/images/search?limit=${limit}`);
  }

  async getImage(imageId: string): Promise<CatImage> {
    return this.request<CatImage>(`/images/${encodeURIComponent(imageId)}`);
  }

  async createFavourite(imageId: string, subId: string): Promise<CatApiCreatedResource> {
    return this.request<CatApiCreatedResource>('/favourites', {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        sub_id: subId
      })
    });
  }

  async listFavourites(subId: string): Promise<Favourite[]> {
    return this.request<Favourite[]>(`/favourites?sub_id=${encodeURIComponent(subId)}`);
  }

  async deleteFavourite(favouriteId: number): Promise<CatApiCreatedResource> {
    return this.request<CatApiCreatedResource>(`/favourites/${favouriteId}`, {
      method: 'DELETE'
    });
  }

  async createVote(imageId: string, subId: string, value: number): Promise<CatApiCreatedResource> {
    return this.request<CatApiCreatedResource>('/votes', {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        sub_id: subId,
        value
      })
    });
  }

  async listVotes(subId: string): Promise<Vote[]> {
    return this.request<Vote[]>(`/votes?sub_id=${encodeURIComponent(subId)}`);
  }

  async deleteVote(voteId: number): Promise<CatApiCreatedResource> {
    return this.request<CatApiCreatedResource>(`/votes/${voteId}`, {
      method: 'DELETE'
    });
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        ...options.headers
      }
    });

    const body = await response.text();
    let parsedBody: unknown = {};

    if (body) {
      try {
        parsedBody = JSON.parse(body) as unknown;
      } catch {
        parsedBody = body;
      }
    }

    if (!response.ok) {
      throw new Error(`CatAPI request failed: ${response.status} ${response.statusText} ${body}`);
    }

    return parsedBody as T;
  }
}

describe('TheCatAPI integration: images, favourites, votes', function () {
  this.timeout(30000);

  const client = new CatApiClient(CAT_API_BASE_URL, CAT_API_KEY);
  const subId = `hw13-${Date.now()}`;

  let imageId: string;
  let favouriteId: number | undefined;
  let voteId: number | undefined;

  afterEach(async () => {
    if (favouriteId !== undefined) {
      await client.deleteFavourite(favouriteId);
      favouriteId = undefined;
    }

    if (voteId !== undefined) {
      await client.deleteVote(voteId);
      voteId = undefined;
    }
  });

  it('uses an image from images/search to create, list and delete a favourite, and validates the favourite image by ID', async () => {
    const images = await client.searchImages();

    expect(images).to.have.length.greaterThan(0);
    expect(images[0]).to.include.keys(['id', 'url']);

    imageId = images[0].id;
    const referenceImage = await client.getImage(imageId);

    expect(referenceImage).to.include({ id: imageId, url: images[0].url });

    const createdFavourite = await client.createFavourite(imageId, subId);
    favouriteId = createdFavourite.id;

    expect(createdFavourite.message).to.equal('SUCCESS');
    expect(favouriteId).to.be.a('number');

    const favourites = await client.listFavourites(subId);
    const favourite = favourites.find((item) => item.id === favouriteId);

    expect(favourite).to.exist;
    expect(favourite).to.include({
      id: favouriteId,
      image_id: imageId,
      sub_id: subId
    });

    const favouriteImage = favourite?.image ?? (await client.getImage(favourite!.image_id));
    expect(favouriteImage).to.include({
      id: referenceImage.id,
      url: referenceImage.url
    });

    const deletedFavourite = await client.deleteFavourite(favouriteId);
    favouriteId = undefined;

    expect(deletedFavourite.message).to.equal('SUCCESS');
  });

  it('uses an image from images/search to create, list and delete a vote, and verifies the image by ID', async () => {
    const images = await client.searchImages();

    expect(images).to.have.length.greaterThan(0);
    expect(images[0]).to.include.keys(['id', 'url']);

    imageId = images[0].id;
    const referenceImage = await client.getImage(imageId);

    expect(referenceImage).to.deep.include({
      id: imageId,
      url: images[0].url
    });

    const createdVote = await client.createVote(imageId, subId, 1);
    voteId = createdVote.id;

    expect(createdVote.message).to.equal('SUCCESS');
    expect(voteId).to.be.a('number');

    const votes = await client.listVotes(subId);
    const vote = votes.find((item) => item.id === voteId);

    expect(vote).to.exist;
    expect(vote).to.include({
      id: voteId,
      image_id: imageId,
      sub_id: subId,
      value: 1
    });

    const imageForVote = await client.getImage(vote!.image_id);
    expect(imageForVote).to.include({
      id: referenceImage.id,
      url: referenceImage.url
    });

    const deletedVote = await client.deleteVote(voteId);
    voteId = undefined;

    expect(deletedVote.message).to.equal('SUCCESS');
  });

  it('fails when requesting a non-existent image by ID', async () => {
    const invalidId = 'non-existent-image-id-1234';

    try {
      await client.getImage(invalidId);
      throw new Error('Expected getImage to throw for a missing image ID');
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect((error as Error).message).to.match(/400|404|Bad Request|Not Found|NOT_FOUND|NotFound|Couldn\'t find image/i);
    }
  });
});
