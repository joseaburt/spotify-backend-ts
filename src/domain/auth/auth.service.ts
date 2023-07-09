import { User } from '../users/index.model';
import Exception from '@joseaburt/http-error';
import Jwt from '../../infrastructure/security/jwt';
import UserRepository from '../users/index.repository';
import Encrypt from '../../infrastructure/security/encrypt';
import { BasicCredentials, WithToken, WithoutPassword } from '../shared/security';

export default class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async login(credentials: BasicCredentials): Promise<WithToken<WithoutPassword<User>>> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user || !Encrypt.compare(credentials.password, user.password)) throw new Exception(401, 'UNAUTHORIZED', 'Invalid credentials');

    const sessionToken = Jwt.sign({ id: user.id, email: user.email });
    return { ...user, token: sessionToken };
  }
}
