import 'reflect-metadata'
import { CryptoService } from '../../src/services';

describe('Service - CryptoService', () => {
  let cryptoService : CryptoService;

  beforeEach(() => {
    cryptoService = new CryptoService();
  });

  it('UniqueString', async () => {
    const MaximumLength = 100;
    const StepLength = 5;

    for (let i = 0; i < MaximumLength; i += StepLength) {
      const result = cryptoService.UniqueString(i);
      expect(result.length).toBe(i);
    }
  });
});
