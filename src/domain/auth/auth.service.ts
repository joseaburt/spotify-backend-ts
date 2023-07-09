import { User } from '../users/index.model';
import Exception from '@joseaburt/http-error';
import UserRepository from '../users/index.repository';
import { EncryptionService, JwtService } from './contracts';
import { BasicCredentials, WithToken, WithoutPassword } from '../shared/security';

export default class AuthService {
  constructor(private userRepository: UserRepository, private tokenService: JwtService, private encrypt: EncryptionService) {}

  public async login(credentials: BasicCredentials): Promise<WithToken<WithoutPassword<User>>> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user || !this.encrypt.compare(credentials.password, user.password)) throw new Exception(401, 'UNAUTHORIZED', 'Invalid credentials');

    const sessionToken = this.tokenService.sign({ id: user.id, email: user.email });
    return { ...user, token: sessionToken };
  }
}
