export type AccessToken = string;

export type WithPassword<T> = T & { password: string };

export type WithToken<T> = T & { token: string };

export type WithoutPassword<T extends WithPassword<any>> = Omit<T, 'password'>;

export type BasicCredentials = WithPassword<{ email: string }>;

export interface SecurityUtilsService {
  createToken(payload: any): Promise<AccessToken>;
  decodeToken<T = any>(token: AccessToken): Promise<T>;
  encodePassword(password: string): Promise<string>;
  arePasswordTheSame(rawPassword: string, hashedPassword: string): Promise<boolean>;
}
