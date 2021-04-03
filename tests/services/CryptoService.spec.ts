import 'reflect-metadata'
import { CryptoService } from '../../src/services';

describe('Service - CryptoService', function () {
  let cryptoService : CryptoService;

  beforeEach(() => {
    cryptoService = new CryptoService();
  });

  it('UniqueString', async function () {
    const MaximumLength = 100;
    const StepLength = 5;

    for (let i = 0; i < MaximumLength; i += StepLength) {
      const result = cryptoService.UniqueString(i);
      expect(result.length).toBe(i);
    }
  });
});
