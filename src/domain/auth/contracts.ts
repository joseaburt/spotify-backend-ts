import { User } from '../users/index.model';

export interface JwtService {
  sign(payload: any): string;
  verify<T>(token: string): T;
}

export interface EncryptionService {
  encode(value: string): string;
  compare(raw: string, hash: string): boolean;
}

export type UserTokenPayload = {
  id: User['id'];
  email: User['email'];
};

export type WithUserTokenPayload<T> = T & { user: UserTokenPayload };
