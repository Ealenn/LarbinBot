import { randomBytes } from 'crypto';
import { singleton } from 'tsyringe';

/**
 * Crypto Service
 */
export interface ICryptoService {
  UniqueString(length: number): string;
}

@singleton()
export class CryptoService implements ICryptoService {
  public UniqueString(length: number): string {
    return randomBytes(length * 10).toString('hex').substr(0, length);
  }
}
