import path from 'path';
import { Verifier } from '@pact-foundation/pact';

describe('Pact V4 provider contract for Petstore inventory', function () {
  this.timeout(20000);

  it('should verify the generated inventory pact against real Petstore provider', async () => {
    const pactFilePath = path.resolve(process.cwd(), 'pacts', 'Pets Web v4 Inventory-Pets API v4.json');

    await new Verifier({
      providerBaseUrl: 'https://petstore.swagger.io',
      pactUrls: [pactFilePath],
      stateHandlers: {
        'inventory available': async () => undefined
      }
    }).verifyProvider();
  });
});
