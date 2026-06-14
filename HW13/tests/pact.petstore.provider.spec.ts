import path from 'path';
import { expect } from 'chai';
import { PactV4, SpecificationVersion, Verifier, Matchers } from '@pact-foundation/pact';

const provider = new PactV4({
  consumer: 'Pets Web v4 Inventory',
  provider: 'Pets API v4',
  spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  dir: 'pacts'
});

class InventoryService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getInventory() {
    const response = await fetch(`${this.baseUrl}/v2/store/inventory`, {
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

describe('Pact V4 provider contract for Petstore inventory', function () {
  this.timeout(20000);

  it('should generate inventory pact and verify against real Petstore provider', async () => {
    const pactFilePath = path.resolve(process.cwd(), 'pacts', 'Pets Web v4 Inventory-Pets API v4.json');

    await provider
      .addInteraction()
      .given('inventory available')
      .uponReceiving('get inventory')
      .withRequest('GET', '/v2/store/inventory', (builder) => {
        builder.headers({ Accept: 'application/json' });
      })
      .willRespondWith(200, (builder) => {
        builder.headers({ 'content-type': 'application/json' });
        builder.jsonBody(Matchers.like({
          available: 1
        }));
      })
      .executeTest(async (mockserver) => {
        const service = new InventoryService(mockserver.url);
        const response = await service.getInventory();

        expect(response.status).to.equal(200);
        expect(response.data).to.be.an('object');
      });

    await new Verifier({
      providerBaseUrl: 'https://petstore.swagger.io',
      pactUrls: [pactFilePath]
    }).verifyProvider();
  });
});
