import { User } from '../../domain/users/index.model';
import DataSource from '@joseaburt/mysql2-query-builder';
import Encrypt from '../../infrastructure/security/encrypt';

export const testConnection = DataSource.createDataSource({
  port: 3306,
  password: '',
  user: 'root',
  host: 'localhost',
  database: 'spotify_clone',
});

export function createDbUser(rawPassword: string): Pick<User, 'id' | 'email' | 'password'> {
  const hashedPassword = Encrypt.encode(rawPassword);
  return { id: 1, password: hashedPassword, email: 'email@gmail.com' };
}

export const jwtServiceMock = {
  sign: jest.fn(),
  verify: jest.fn(),
};
