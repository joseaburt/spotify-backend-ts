export interface JwtService {
  sign(payload: any): string;
  verify<T>(token: string): T;
}

export interface EncryptionService {
  encode(value: string): string;
  compare(raw: string, hash: string): boolean;
}
