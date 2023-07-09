import { User } from '../../domain/users/index.model';
import Encrypt from '../../infrastructure/security/encrypt';

export function createDbUser(rawPassword: string): Pick<User, 'id' | 'email' | 'password'> {
  const hashedPassword = Encrypt.encode(rawPassword);
  return { id: 1, password: hashedPassword, email: 'email@gmail.com' };
}
