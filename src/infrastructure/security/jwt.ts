import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export class JWT {
  private secret: string;
  private static instance: JWT;

  private constructor() {
    if (!JWT_SECRET) throw new Error('JWTNoSecretValueDefined');
    this.secret = JWT_SECRET;
  }

  public sign(payload: any) {
    return jwt.sign(payload, this.secret);
  }

  public verify<T>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }

  public static getInstance(): JWT {
    if (!this.instance) this.instance = new JWT();
    return this.instance;
  }
}

export default JWT.getInstance();
