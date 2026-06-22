import { expect } from 'chai';
import { Matchers, PactV4, SpecificationVersion } from '@pact-foundation/pact';

const provider = new PactV4({
  consumer: 'Pets Web v4',
  provider: 'Pets API v4',
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  dir: 'pacts'
});

class PetService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createPet(petExample: Record<string, unknown>) {
    const response = await fetch(`${this.baseUrl}/v2/pet`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(petExample)
    });

    return {
      status: response.status,
      data: await response.json()
    };
  }

  async getPet(petId: number) {
    const response = await fetch(`${this.baseUrl}/v2/pet/${petId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    return {
      status: response.status,
      data: await response.json()
    };
  }
}

describe('Pact V4 consumer contract tests', function () {
  this.timeout(20000);

  const petExample = {
    id: 1001,
    category: { id: 1, name: 'cats' },
    name: 'Garfield',
    photoUrls: ['https://example.com/image.jpg'],
    tags: [{ id: 1, name: 'cute' }],
    status: 'available'
  };

  it('should create a pet and generate a Pact contract for POST /v2/pet', async () => {
    await provider
      .addInteraction()
      .given('pet interaction')
      .uponReceiving('create a pet')
      .withRequest('POST', '/v2/pet', (builder) => {
        builder.headers({ Accept: 'application/json', 'Content-Type': 'application/json' });
        builder.jsonBody(Matchers.like(petExample));
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'content-type': 'application/json' });
        builder.jsonBody(Matchers.like(petExample));
      })
      .executeTest(async (mockserver) => {
        const service = new PetService(mockserver.url);
        const responsePost = await service.createPet(petExample);

        expect(responsePost.status).to.equal(200);
        expect(responsePost.data).to.deep.equal(petExample);
      });
  });

  it('should get a pet and generate a Pact contract for GET /v2/pet/1001', async () => {
    await provider
      .addInteraction()
      .given('pet interaction')
      .uponReceiving('get a pet')
      .withRequest('GET', '/v2/pet/1001', (builder) => {
        builder.headers({ Accept: 'application/json' });
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'content-type': 'application/json' });
        builder.jsonBody(Matchers.like(petExample));
      })
      .executeTest(async (mockserver) => {
        const service = new PetService(mockserver.url);
        const response = await service.getPet(1001);

        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal(petExample);
      });
  });
});

