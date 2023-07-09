import { User } from '../users/index.model';
import Jwt from '../../infrastructure/security/jwt';
import UserRepository from '../users/index.repository';
import Encrypt from '../../infrastructure/security/encrypt';
import { BasicCredentials, WithToken, WithoutPassword } from '../shared/security';

export default class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async login(credentials: BasicCredentials): Promise<WithToken<WithoutPassword<User>>> {
    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) throw new Error(`User not found by email "${credentials.email}"`);
    if (!Encrypt.compare(credentials.password, user.password)) throw new Error('Invalid credentials');

    const sessionToken = Jwt.sign({ id: user.id, email: user.email });
    return { ...user, token: sessionToken };
  }
}
