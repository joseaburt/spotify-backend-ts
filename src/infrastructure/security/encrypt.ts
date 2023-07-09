import bcrypt from 'bcrypt';
import { EncryptionService } from '../../domain/auth/contracts';

export class Encrypt implements EncryptionService {
  private static instance: Encrypt;
  private saltRounds: number = 10;
  private constructor() {}

  public encode(value: string): string {
    return bcrypt.hashSync(value, bcrypt.genSaltSync(this.saltRounds));
  }

  public compare(raw: string, hash: string): boolean {
    return bcrypt.compareSync(raw, hash);
  }

  public static getInstance(): Encrypt {
    if (!this.instance) this.instance = new Encrypt();
    return this.instance;
  }
}

export default Encrypt.getInstance();
